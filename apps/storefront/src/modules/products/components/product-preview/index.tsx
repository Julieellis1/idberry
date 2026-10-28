import { getProductPrice } from "@lib/util/get-product-price"
import { ArrowUpRightMini } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"
import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured: _isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const image = product.thumbnail || product.images?.[0]?.url

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <div data-testid="product-wrapper" className="flex h-full flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-blush bg-white shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-xl">
          {image ? (
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="(max-width: 512px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={75}
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-blush/40">
              <PlaceholderImage size={24} />
            </div>
          )}
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-berry text-ivory opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          >
            <ArrowUpRightMini />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-1 pt-4">
          {product.collection?.title && (
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
              {product.collection.title}
            </span>
          )}
          <Text
            className="font-serif text-xl leading-snug text-ink"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="mt-auto flex items-center gap-x-2 pt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
