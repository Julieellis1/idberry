import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import ProductCarousel from "./product-carousel"

const PRODUCT_FIELDS = "*variants.calculated_price"

/** The Edit: one horizontal product carousel of real products. No tabs, no badges, no ratings: only real names and real region prices. */
export async function TheEditSection({
  region,
}: {
  region: HttpTypes.StoreRegion | null
}) {
  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 12,
      fields: PRODUCT_FIELDS,
    },
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="bg-blush/40 py-20" aria-labelledby="the-edit-heading">
      <div className="content-container">
        <div className="mb-10">
          <span className="uppercase tracking-[0.3em] text-xs text-berry">
            The Edit
          </span>
          <h2
            id="the-edit-heading"
            className="font-serif text-4xl small:text-5xl text-ink mt-3"
          >
            Loved by <span className="italic text-berry">glowing</span> skin.
          </h2>
        </div>
        <ProductCarousel>
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[240px] small:w-[280px] shrink-0 snap-start"
            >
              <ProductPreview product={product} region={region} />
            </div>
          ))}
        </ProductCarousel>
      </div>
    </section>
  )
}
