/* eslint-disable @next/next/no-img-element */
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { productNameFromHandle } from "@lib/journal"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

/**
 * "Shop the ritual" strip: fetches the post's relatedProducts from Medusa by
 * handle. If the backend is unreachable or a handle no longer exists, it falls
 * back to simple named links so the article never breaks.
 */
export default async function ShopTheRitual({
  handles,
  countryCode,
}: {
  handles: string[]
  countryCode: string
}) {
  if (!handles.length) {
    return null
  }

  let region: HttpTypes.StoreRegion | null | undefined = null
  let products: HttpTypes.StoreProduct[] = []
  try {
    region = await getRegion(countryCode)
    if (region) {
      const { response } = await listProducts({
        countryCode,
        queryParams: { handle: handles, limit: handles.length },
      })
      products = response.products
    }
  } catch {
    products = []
  }

  const byHandle = new Map(products.map((p) => [p.handle, p]))

  return (
    <section aria-labelledby="shop-the-ritual" className="mt-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 id="shop-the-ritual" className="font-serif text-3xl small:text-4xl text-berry">
          Shop the ritual
        </h2>
        <LocalizedClientLink
          href="/store"
          className="text-xs uppercase tracking-[0.2em] text-berry hover:text-gold"
        >
          Shop all →
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-6">
        {handles.map((handle) => {
          const product = byHandle.get(handle)
          return (
            <li key={handle}>
              {product && region ? (
                <ProductPreview product={product} region={region} />
              ) : (
                <LocalizedClientLink
                  href={`/products/${handle}`}
                  className="flex h-full min-h-[160px] flex-col justify-between rounded-2xl border border-blush bg-white/60 p-5 hover:border-gold"
                >
                  <span className="font-serif text-xl text-berry leading-snug">
                    {productNameFromHandle(handle)}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold mt-4">
                    View product →
                  </span>
                </LocalizedClientLink>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
