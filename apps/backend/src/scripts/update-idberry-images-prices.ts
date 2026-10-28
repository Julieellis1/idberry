/**
 * IDBERRY Beauty image + price update for EXISTING products.
 *
 * Updates products in place. It NEVER creates products. Run it once, after a
 * backend redeploy that includes the updated catalogue data file, from the
 * Dokploy app terminal:
 *
 *   cd apps/backend && npx medusa exec ./src/scripts/update-idberry-images-prices.ts
 *
 * Then redeploy the storefront so the new public WebP images are served.
 *
 * What it does, per catalogue entry (apps/backend/src/data/idberry-catalogue.ts):
 *   - thumbnail + product image: old hot-linked idberrybeauty.com URL (or any
 *     previous value) -> the local WebP path in the catalogue's `image`
 *     field, e.g. "/images/products/<handle>.webp" (storefront public folder,
 *     served from the storefront domain on staging and on the main domain).
 *   - "Standard" variant prices: USD amount unchanged; NGN amount set to the
 *     conversion below.
 *
 * NGN conversion (NOT an owner-supplied Naira price list):
 *   Rate 1350 NGN/USD, chosen 28 Oct 2026. The official window on 28 Oct 2026
 *   was about 1341-1353 NGN/USD, so 1350 sits inside it. NGN amounts are
 *   rounded to the nearest 500 Naira: Math.round(usd * 1350 / 500) * 500.
 *   Owner confirmation of real Naira prices is still outstanding; when the
 *   owner supplies a real Naira price list, replace these converted amounts.
 *
 * Idempotent: products already showing the new thumbnail, image and prices
 * are logged and skipped. After each batch the script re-queries the
 * products and fails loudly if any thumbnail, image or NGN price does not
 * match the catalogue. It fails loudly if a catalogue product or its
 * "Standard" variant is not found, or if a variant has no NGN price to read
 * the old amount from.
 *
 * Price/image update shape: updateProductsWorkflow with
 * { products: [{ id, thumbnail, images: [{ id, url }], variants: [{ id,
 * prices: [{ currency_code, amount }] }] }] }. Verified 28 Oct 2026
 * against the installed 2.22.1 package sources: @medusajs/core-flows
 * update-products workflow (variant prices are extracted and upserted
 * by its upsert-variant-prices step, Partial<CreateMoneyAmountDTO>)
 * and @medusajs/types UpsertProductImageDTO ({ id, url }). The script
 * also re-queries after each batch and fails loudly if the stored
 * thumbnail, image or NGN price does not match.
 */
import type { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { IDBERRY_CATALOGUE } from "../data/idberry-catalogue"

/**
 * Conversion rate chosen 28 Oct 2026 (see header). NOT a real Naira price
 * list; owner confirmation of real Naira prices is still outstanding.
 */
const NGN_PER_USD = 1350
const ROUND_TO = 500

const ngnAmount = (priceUsd: number) =>
  Math.round((priceUsd * NGN_PER_USD) / ROUND_TO) * ROUND_TO

type DbProduct = {
  id: string
  handle: string
  thumbnail: string | null
  images?: { id: string; url: string }[]
  variants?: {
    id: string
    title: string
    prices?: { currency_code: string; amount: number | null }[]
  }[]
}

export default async function updateIdberryImagesPrices({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: dbProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.*", "variants.*", "variants.prices.*"],
  })
  const byHandle = new Map<string, DbProduct>(
    (dbProducts as DbProduct[]).map((p) => [p.handle, p])
  )
  logger.info(`Found ${dbProducts.length} products in the database.`)

  const BATCH = 15
  for (let i = 0; i < IDBERRY_CATALOGUE.length; i += BATCH) {
    const batch = IDBERRY_CATALOGUE.slice(i, i + BATCH)
    const updates: {
      id: string
      thumbnail: string
      images: { id?: string; url: string }[]
      variants: {
        id: string
        prices: { currency_code: string; amount: number }[]
      }[]
    }[] = []
    const expected = new Map<string, { thumbnail: string; ngn: number; usd: number }>()

    for (const p of batch) {
      const db = byHandle.get(p.handle)
      if (!db) {
        throw new Error(`Product not found in database: handle "${p.handle}" (${p.title})`)
      }
      const variant = (db.variants ?? []).find((v) => v.title === "Standard")
      if (!variant) {
        throw new Error(
          `Standard variant not found for product "${p.handle}" (variants: ${(db.variants ?? []).map((v) => v.title).join(", ") || "none"})`
        )
      }
      const oldNgnPrice = (variant.prices ?? []).find(
        (pr) => pr.currency_code === "ngn"
      )
      if (!oldNgnPrice) {
        throw new Error(`No NGN price found for variant of product "${p.handle}"`)
      }
      const oldUsdPrice = (variant.prices ?? []).find(
        (pr) => pr.currency_code === "usd"
      )
      const newNgn = ngnAmount(p.price_usd)
      const newThumbnail = p.image
      const oldThumbnail = db.thumbnail ?? ""
      const existingImages = db.images ?? []
      // Replace the URL on the existing image record(s) so the product does
      // not end up with both the old and the new image attached. Products
      // seeded by seed-idberry.ts have exactly one image.
      const images =
        existingImages.length > 0
          ? existingImages.map((img) => ({ id: img.id, url: newThumbnail }))
          : [{ url: newThumbnail }]
      const alreadyCurrent =
        oldThumbnail === newThumbnail &&
        existingImages.length > 0 &&
        existingImages.every((img) => img.url === newThumbnail) &&
        oldNgnPrice.amount === newNgn &&
        oldUsdPrice?.amount === p.price_usd
      logger.info(
        `handle=${p.handle} old_thumbnail=${oldThumbnail} new_thumbnail=${newThumbnail} old_ngn=${oldNgnPrice.amount} new_ngn=${newNgn} usd=${p.price_usd}${alreadyCurrent ? " (already current, skipping)" : ""}`
      )
      if (alreadyCurrent) {
        continue
      }
      expected.set(db.id, { thumbnail: newThumbnail, ngn: newNgn, usd: p.price_usd })
      updates.push({
        id: db.id,
        thumbnail: newThumbnail,
        images,
        variants: [
          {
            id: variant.id,
            prices: [
              { currency_code: "usd", amount: p.price_usd },
              { currency_code: "ngn", amount: newNgn },
            ],
          },
        ],
      })
    }

    if (updates.length > 0) {
      await updateProductsWorkflow(container).run({
        input: { products: updates },
      })
    }

    // Re-query and verify the batch actually took effect.
    const { data: after } = await query.graph({
      entity: "product",
      fields: ["id", "handle", "thumbnail", "images.*", "variants.*", "variants.prices.*"],
    })
    const afterById = new Map<string, DbProduct>(
      (after as DbProduct[]).map((p) => [p.id, p])
    )
    for (const [id, exp] of expected) {
      const prod = afterById.get(id)
      if (!prod) {
        throw new Error(`Product ${id} disappeared after update`)
      }
      const variant = (prod.variants ?? []).find((v) => v.title === "Standard")
      const ngn = (variant?.prices ?? []).find((pr) => pr.currency_code === "ngn")
      const usd = (variant?.prices ?? []).find((pr) => pr.currency_code === "usd")
      const imageUrls = (prod.images ?? []).map((img) => img.url)
      if (
        prod.thumbnail !== exp.thumbnail ||
        !imageUrls.includes(exp.thumbnail) ||
        ngn?.amount !== exp.ngn ||
        usd?.amount !== exp.usd
      ) {
        throw new Error(
          `Verification failed for product ${prod.handle}: thumbnail=${prod.thumbnail} images=[${imageUrls.join(", ")}] ngn=${ngn?.amount} usd=${usd?.amount}, expected thumbnail=${exp.thumbnail} ngn=${exp.ngn} usd=${exp.usd}`
        )
      }
    }
    logger.info(
      `  …${Math.min(i + BATCH, IDBERRY_CATALOGUE.length)}/${IDBERRY_CATALOGUE.length} checked`
    )
  }

  logger.info("IDBERRY image + price update complete.")
}
