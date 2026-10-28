import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  const isSale = selectedPrice.price_type === "sale"

  return (
    <div className="flex flex-col text-ui-fg-base">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span
          className={clx("text-3xl font-bold tracking-tight text-ink", {
            "text-ui-fg-interactive": isSale,
          })}
        >
          {!variant && "From "}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>
        {isSale && (
          <span className="rounded-md bg-ink px-2 py-1 text-xs font-bold text-ivory">
            -{selectedPrice.percentage_diff}%
          </span>
        )}
      </div>
      {isSale && (
        <p className="mt-1">
          <span
            className="line-through text-ui-fg-muted"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </p>
      )}
    </div>
  )
}
