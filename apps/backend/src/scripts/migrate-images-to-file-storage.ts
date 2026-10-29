/**
 * IDBERRY Beauty image migration to S3-compatible file storage
 * (Cloudflare R2).
 *
 * Uploads the local WebP product images to the configured R2 bucket
 * returned absolute public URLs, so Admin uploads and previews get real
 * public URLs instead of localhost addresses. It NEVER creates products
 * and NEVER touches prices, variants, or any other field. Run it once,
 * after a backend redeploy that includes the file module configuration
 * (see DEPLOY-STAGING.md), from the Dokploy app terminal:
 *
 *   cd apps/backend && npx medusa exec ./src/scripts/migrate-images-to-file-storage.ts
 *
 * (If the Dokploy terminal starts at /, run `cd /app` first, then the
 * command above.) Then redeploy the storefront so the new image URLs
 * are served.
 *
 * What it does:
 *   - Reads every *.webp file in the storefront public images folder
 *     (resolved from the backend app, so it works locally and in the
 *     Dokploy container at /app).
 *   - Uploads, through uploadFilesWorkflow with access "public" and
 *     content type image/webp, only the files still referenced by a
 *     relative or localhost product URL. Files already served from the
 *     file storage are never re-uploaded.
 *   - Updates ONLY products holding a relative (/images/...) or
 *     localhost image or thumbnail URL, replacing those URLs with the
 *     uploaded absolute URLs, preserving image order and ranks by
 *     reusing the existing image record ids. The thumbnail follows the
 *     same mapping as the image it points at.
 *
 * Idempotent: a product already showing absolute file-storage URLs is
 * logged and skipped, and a re-run uploads nothing for files that are
 * already migrated. After the update the script re-queries and fails
 * loudly if any updated product still holds a relative or localhost
 * URL, or if the stored image list does not match the expected mapped
 * list exactly. It fails loudly if the S3 env vars are missing, if a
 * referenced local file is missing, or if an upload returns a URL that
 * does not start with S3_FILE_URL (which means the S3 file provider is
 * not the active provider).
 *
 * Upload shape: uploadFilesWorkflow with
 * { files: [{ filename, mimeType: "image/webp", content: base64,
 * access: "public" }] }. Verified 29 Oct 2026 against the installed
 * 2.22.1 package sources: @medusajs/core-flows upload-files workflow
 * and the Admin uploads route in @medusajs/medusa, which use exactly
 * this shape with base64 content. Product update shape:
 * updateProductsWorkflow with
 * { products: [{ id, thumbnail, images: [{ id, url }] }] }, which
 * REPLACES the whole image list (verified 29 Oct 2026, see
 * update-scrub-250g-gallery.ts).
 *
 * Note: the catalogue and seed still write relative paths, so a fresh
 * seed after migration would reintroduce relative URLs. Re-run this
 * script after any fresh seed, or update the catalogue with the bucket
 * prefix at that point. See DEPLOY-STAGING.md.
 */
import { promises as fs } from "fs"
import path from "path"
import type { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  updateProductsWorkflow,
  uploadFilesWorkflow,
} from "@medusajs/medusa/core-flows"

const UPLOAD_BATCH = 20

type DbProduct = {
  id: string
  handle: string
  thumbnail: string | null
  images?: { id: string; url: string }[]
}

const basenameOf = (url: string) => {
  const clean = url.split("?")[0].split("#")[0]
  return clean.split("/").pop() ?? ""
}

const needsMigration = (url: string) =>
  url.startsWith("/images/") || url.includes("localhost")

async function resolveImagesDir(logger: {
  info: (message: string) => void
}) {
  const candidates = [
    path.resolve(process.cwd(), "../storefront/public/images/products"),
    "/app/apps/storefront/public/images/products",
  ]
  for (const dir of candidates) {
    try {
      const stat = await fs.stat(dir)
      if (stat.isDirectory()) {
        logger.info(`Using local images folder: ${dir}`)
        return dir
      }
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error(
    `Local images folder not found. Tried: ${candidates.join(", ")}`
  )
}

export default async function migrateImagesToFileStorage({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const fileUrl = (process.env.S3_FILE_URL ?? "").replace(/\/+$/, "")
  const missing = ["S3_FILE_URL", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY", "S3_REGION", "S3_BUCKET", "S3_ENDPOINT"].filter(
    (name) => !process.env[name]
  )
  if (!fileUrl || missing.length > 0) {
    throw new Error(
      `R2 file storage is not configured. Missing env vars: ${missing.join(", ") || "S3_FILE_URL"}. ` +
        "Set the S3 env vars in Dokploy and redeploy the backend before running this script. See DEPLOY-STAGING.md."
    )
  }

  const imagesDir = await resolveImagesDir(logger)
  const localFiles = (await fs.readdir(imagesDir)).filter((name) =>
    name.toLowerCase().endsWith(".webp")
  )
  const localSet = new Set(localFiles)
  logger.info(`Found ${localFiles.length} local WebP files in ${imagesDir}.`)

  const { data: dbProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.*"],
  })
  const products = dbProducts as DbProduct[]
  logger.info(`Found ${products.length} products in the database.`)

  // Collect the local filenames still referenced by a relative or
  // localhost URL, and fail loudly if any referenced file is missing.
  const needed = new Set<string>()
  const missingFiles = new Set<string>()
  for (const product of products) {
    const urls = [...(product.images ?? []).map((img) => img.url)]
    if (product.thumbnail) {
      urls.push(product.thumbnail)
    }
    for (const url of urls) {
      if (!needsMigration(url)) {
        continue
      }
      const name = basenameOf(url)
      if (!name || !localSet.has(name)) {
        missingFiles.add(`${name || "(empty)"} (product ${product.handle})`)
      } else {
        needed.add(name)
      }
    }
  }
  if (missingFiles.size > 0) {
    throw new Error(
      `Local files missing for referenced image URLs: ${[...missingFiles].join(", ")}. ` +
        "Add the missing WebP files to the storefront public images folder before running this script."
    )
  }
  logger.info(
    `Files to upload: ${needed.size} (${[...needed].join(", ") || "none"}).`
  )

  // Upload each needed file once, in batches. The provider appends a
  // unique suffix to the key, so the returned URL is the canonical one
  // for this run; re-runs skip files that are already migrated.
  const uploaded = new Map<string, string>()
  const neededList = [...needed]
  for (let i = 0; i < neededList.length; i += UPLOAD_BATCH) {
    const batch = neededList.slice(i, i + UPLOAD_BATCH)
    const files: {
      filename: string
      mimeType: string
      content: string
      access: "public" | "private"
    }[] = []
    for (const name of batch) {
      const buffer = await fs.readFile(path.join(imagesDir, name))
      files.push({
        filename: name,
        mimeType: "image/webp",
        content: buffer.toString("base64"),
        access: "public" as const,
      })
    }
    const { result } = await uploadFilesWorkflow(container).run({
      input: { files },
    })
    const uploadedFiles = Array.isArray(result) ? result : [result]
    if (uploadedFiles.length !== batch.length) {
      throw new Error(
        `Upload returned ${uploadedFiles.length} files for a batch of ${batch.length}. Aborting before any product update.`
      )
    }
    uploadedFiles.forEach((file, index) => {
      const url = file.url
      if (!url.startsWith(`${fileUrl}/`)) {
        throw new Error(
          `Upload for ${batch[index]} returned URL "${url}", which does not start with S3_FILE_URL "${fileUrl}/". ` +
            "The S3 file provider is not the active provider. Check the backend env vars and redeploy before re-running."
        )
      }
      uploaded.set(batch[index], url)
      logger.info(`Uploaded ${batch[index]} -> ${url}`)
    })
  }

  // Build the product updates, reusing existing image record ids so the
  // image list is replaced in place with the same order and ranks.
  const updates: {
    id: string
    thumbnail: string
    images: { id?: string; url: string }[]
  }[] = []
  const expected = new Map<
    string,
    { handle: string; thumbnail: string; images: string[] }
  >()
  let alreadyCurrent = 0
  for (const product of products) {
    const existingImages = product.images ?? []
    const mapUrl = (url: string) => {
      if (!needsMigration(url)) {
        return url
      }
      const next = uploaded.get(basenameOf(url))
      if (!next) {
        throw new Error(
          `No uploaded URL for image "${url}" on product ${product.handle}.`
        )
      }
      return next
    }
    const newImages = existingImages.map((img) => ({
      id: img.id,
      url: mapUrl(img.url),
    }))
    const oldThumbnail = product.thumbnail ?? ""
    const newThumbnail = oldThumbnail
      ? mapUrl(oldThumbnail)
      : newImages[0]?.url ?? ""
    if (!newThumbnail) {
      logger.info(
        `handle=${product.handle} has no thumbnail and no images, skipping.`
      )
      continue
    }
    const changed =
      oldThumbnail !== newThumbnail ||
      newImages.some((img, index) => img.url !== existingImages[index]?.url)
    if (!changed) {
      alreadyCurrent += 1
      logger.info(`handle=${product.handle} already on file-storage URLs, skipping.`)
      continue
    }
    logger.info(
      `handle=${product.handle} old_thumbnail=${oldThumbnail} new_thumbnail=${newThumbnail} images ${existingImages.length} -> ${newImages.length}`
    )
    expected.set(product.id, {
      handle: product.handle,
      thumbnail: newThumbnail,
      images: newImages.map((img) => img.url),
    })
    updates.push({ id: product.id, thumbnail: newThumbnail, images: newImages })
  }

  if (updates.length > 0) {
    await updateProductsWorkflow(container).run({
      input: { products: updates },
    })
  }

  // Re-query and verify every updated product exactly.
  const { data: after } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.*"],
  })
  const afterById = new Map<string, DbProduct>(
    (after as DbProduct[]).map((p) => [p.id, p])
  )
  for (const [id, exp] of expected) {
    const prod = afterById.get(id)
    if (!prod) {
      throw new Error(`Product ${id} disappeared after update`)
    }
    const afterUrls = (prod.images ?? []).map((img) => img.url)
    const leftover = afterUrls
      .concat(prod.thumbnail ?? "")
      .filter((url) => url.startsWith("/images/") || url.includes("localhost"))
    if (
      prod.thumbnail !== exp.thumbnail ||
      afterUrls.length !== exp.images.length ||
      !afterUrls.every((url, index) => url === exp.images[index]) ||
      leftover.length > 0
    ) {
      throw new Error(
        `Verification failed for product ${prod.handle}: thumbnail=${prod.thumbnail} images=[${afterUrls.join(", ")}], expected thumbnail=${exp.thumbnail} images=[${exp.images.join(", ")}]`
      )
    }
  }

  logger.info(
    `IDBERRY image migration to file storage complete. Uploaded ${uploaded.size} files, updated ${updates.length} products, ${alreadyCurrent} already current.`
  )
}
