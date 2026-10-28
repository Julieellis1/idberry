/**
 * IDBERRY Beauty gallery update for ONE existing product:
 * Snow White Plus Radiance Scrub 250g
 * (handle "snow-white-plus-radiance-scrub-250g").
 *
 * Updates that product in place. It NEVER creates products, NEVER touches
 * prices or variants, and NEVER touches any other product (including the
 * 500g scrub, which keeps sharing its existing image). Run it once, after
 * a backend redeploy that includes the updated catalogue data file and a
 * storefront redeploy that includes the new WebP files, from the Dokploy
 * app terminal:
 *
 *   cd apps/backend && npx medusa exec ./src/scripts/update-scrub-250g-gallery.ts
 *
 * (If the Dokploy terminal starts at /, run `cd /app` first, then the
 * command above.) Then redeploy the storefront so the new gallery images
 * are served.
 *
 * What it does: sets the thumbnail to the main WebP path and the images
 * to the four WebP paths in order (main, studio, lifestyle, ad), taken
 * from the catalogue entry for this handle
 * (apps/backend/src/data/idberry-catalogue.ts).
 *
 * Idempotent: a product already showing the new thumbnail and the exact
 * ordered image list is logged and skipped. After the update the script
 * re-queries and fails loudly if the thumbnail or the exact ordered
 * image URL list does not match. It fails loudly if the product is not
 * found.
 *
 * Image update shape: updateProductsWorkflow with
 * { products: [{ id, thumbnail, images: [{ id, url }] }] }. Verified
 * 28 Oct 2026 against the installed 2.22.1 package sources:
 * @medusajs/types UpsertProductImageDTO ({ id, url }).
 */
import type { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { IDBERRY_CATALOGUE } from "../data/idberry-catalogue"

const HANDLE = "snow-white-plus-radiance-scrub-250g"

type DbProduct = {
  id: string
  handle: string
  thumbnail: string | null
  images?: { id: string; url: string }[]
}

export default async function updateScrub250gGallery({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const entry = IDBERRY_CATALOGUE.find((p) => p.handle === HANDLE)
  if (!entry) {
    throw new Error(`Catalogue entry not found: handle "${HANDLE}"`)
  }
  const newImages = entry.images ?? [entry.image]
  const newThumbnail = entry.image

  const { data: dbProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.*"],
    filters: { handle: HANDLE },
  })
  const db = (dbProducts as DbProduct[])[0]
  if (!db) {
    throw new Error(`Product not found in database: handle "${HANDLE}"`)
  }

  const existingImages = db.images ?? []
  const oldThumbnail = db.thumbnail ?? ""
  const oldUrls = existingImages.map((img) => img.url)
  const alreadyCurrent =
    oldThumbnail === newThumbnail &&
    oldUrls.length === newImages.length &&
    oldUrls.every((url, i) => url === newImages[i])
  logger.info(
    `handle=${HANDLE} old_thumbnail=${oldThumbnail} new_thumbnail=${newThumbnail} old_images=[${oldUrls.join(", ")}] new_images=[${newImages.join(", ")}]${alreadyCurrent ? " (already current, skipping)" : ""}`
  )

  if (!alreadyCurrent) {
    // Reuse the existing image record ids in order so the product does
    // not end up with stale images attached; create the extra records.
    const images = newImages.map((url, i) => {
      const existing = existingImages[i]
      return existing ? { id: existing.id, url } : { url }
    })
    await updateProductsWorkflow(container).run({
      input: {
        products: [{ id: db.id, thumbnail: newThumbnail, images }],
      },
    })
  }

  const { data: after } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.*"],
    filters: { handle: HANDLE },
  })
  const prod = (after as DbProduct[])[0]
  if (!prod) {
    throw new Error(`Product ${db.id} disappeared after update`)
  }
  const afterUrls = (prod.images ?? []).map((img) => img.url)
  if (
    prod.thumbnail !== newThumbnail ||
    afterUrls.length !== newImages.length ||
    !afterUrls.every((url, i) => url === newImages[i])
  ) {
    throw new Error(
      `Verification failed for product ${prod.handle}: thumbnail=${prod.thumbnail} images=[${afterUrls.join(", ")}], expected thumbnail=${newThumbnail} images=[${newImages.join(", ")}]`
    )
  }

  logger.info("IDBERRY scrub 250g gallery update complete.")
}
