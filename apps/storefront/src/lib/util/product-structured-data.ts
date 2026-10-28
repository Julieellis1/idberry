import { HttpTypes } from "@medusajs/types"
import { isVariantInStock } from "./inventory"
import { STORE_NAME } from "./site"
import {
  buildReturnPolicy,
  buildShippingDetails,
  getRegionPolicies,
} from "./store-policies"

const SCHEMA_IN_STOCK = "https://schema.org/InStock"
const SCHEMA_OUT_OF_STOCK = "https://schema.org/OutOfStock"

export const getPricedVariants = (product: HttpTypes.StoreProduct) =>
  (product.variants ?? []).filter(
    (variant) => variant.calculated_price?.calculated_amount != null
  )

export const buildProductStructuredData = ({
  product,
  region,
  countryCode,
  productUrl,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  productUrl: string
}) => {
  const currency = region.currency_code.toUpperCase()
  // Google product rich results require absolute image URLs. Product
  // images are stored as relative storefront paths ("/images/..."), so
  // prefix them with the origin of the absolute product URL. Already
  // absolute URLs pass through unchanged.
  const origin = new URL(productUrl).origin
  const toAbsoluteImageUrl = (url: string) =>
    /^https?:\/\//i.test(url)
      ? url
      : url.startsWith("/")
        ? `${origin}${url}`
        : `${origin}/${url}`
  const images = (product.images ?? [])
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url))
    .map(toAbsoluteImageUrl)
  if (!images.length && product.thumbnail) {
    images.push(toAbsoluteImageUrl(product.thumbnail))
  }
  const description = product.description || product.title
  const brand = { "@type": "Brand", name: STORE_NAME }
  const policies = getRegionPolicies(region)
  const optionTitles = new Map(
    (product.options ?? []).map((option) => [option.id, option.title])
  )

  const buildOffer = (variant: HttpTypes.StoreProductVariant, url: string) => ({
    "@type": "Offer",
    url,
    sku: variant.sku || undefined,
    price: variant.calculated_price!.calculated_amount!.toFixed(2),
    priceCurrency: currency,
    availability: isVariantInStock(variant)
      ? SCHEMA_IN_STOCK
      : SCHEMA_OUT_OF_STOCK,
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: STORE_NAME, url: origin },
    ...(policies
      ? {
          shippingDetails: buildShippingDetails(policies, countryCode, currency),
          hasMerchantReturnPolicy: buildReturnPolicy(policies, countryCode),
        }
      : {}),
  })

  const variants = getPricedVariants(product)

  if (variants.length <= 1) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      description,
      image: images,
      brand,
      sku: variants[0]?.sku || undefined,
      url: productUrl,
      offers: variants[0] ? buildOffer(variants[0], productUrl) : undefined,
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.title,
    description,
    image: images,
    brand,
    url: productUrl,
    productGroupID: product.id,
    variesBy: (product.options ?? []).map((option) => option.title),
    hasVariant: variants.map((variant) => {
      const variantUrl = `${productUrl}?v_id=${variant.id}`
      return {
        "@type": "Product",
        name: `${product.title} - ${variant.title}`,
        sku: variant.sku || undefined,
        image: variant.images?.[0]?.url
          ? toAbsoluteImageUrl(variant.images[0].url)
          : images[0],
        additionalProperty: (variant.options ?? []).map((value) => ({
          "@type": "PropertyValue",
          name: optionTitles.get(value.option_id ?? ""),
          value: value.value,
        })),
        offers: buildOffer(variant, variantUrl),
      }
    }),
  }
}

/** Serializes JSON-LD for a `<script>` tag without allowing `</script>` breakouts. */
export const toJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c")
