import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

const PRODUCT_FIELDS = "*variants.calculated_price"

async function fetchProducts(regionId: string, limit: number) {
  const {
    response: { products },
  } = await listProducts({
    regionId,
    queryParams: {
      limit,
      fields: PRODUCT_FIELDS,
    },
  })
  return products ?? []
}

/** First section after the hero: exactly 4 products, no collection filter. */
export async function FeaturedProductsSection({
  region,
}: {
  region: HttpTypes.StoreRegion | null
}) {
  if (!region) {
    return null
  }

  const products = await fetchProducts(region.id, 4)
  if (!products.length) {
    return null
  }

  return (
    <section className="content-container py-20" aria-labelledby="featured-products-heading">
      <div className="mb-10 text-center">
        <span className="uppercase tracking-[0.3em] text-xs text-gold">
          Featured
        </span>
        <h2
          id="featured-products-heading"
          className="font-serif text-4xl small:text-5xl text-berry mt-3"
        >
          Featured products
        </h2>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Main product section: at most 8 products in a 4 by 2 grid, with a View more link to the main shop page. */
export async function ShopProductsSection({
  region,
}: {
  region: HttpTypes.StoreRegion | null
}) {
  if (!region) {
    return null
  }

  const products = await fetchProducts(region.id, 8)
  if (!products.length) {
    return null
  }

  return (
    <section className="content-container py-20" aria-labelledby="shop-products-heading">
      <div className="flex items-end justify-between gap-4 mb-10">
        <h2
          id="shop-products-heading"
          className="font-serif text-4xl small:text-5xl text-berry"
        >
          Shop IDBERRY
        </h2>
        <LocalizedClientLink
          href="/store"
          className="shrink-0 text-sm uppercase tracking-[0.2em] text-berry hover:text-gold"
        >
          View more →
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </section>
  )
}
