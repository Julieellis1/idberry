import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import WhatsAppButton from "@modules/home/components/idberry/whatsapp-button"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import JsonLd from "@modules/common/components/json-ld"
import { listRegions } from "@lib/data/regions"
import { getSiteOrigin } from "@lib/util/site"
import { buildRegionsReturnPolicies } from "@lib/util/store-policies"
import {
  founderJsonLd,
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@lib/seo"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([
    getSiteOrigin(),
    listRegions().catch(() => []),
  ])
  const returnPolicies = buildRegionsReturnPolicies(regions)
  // Site-wide entity graph (Organization, LocalBusiness, WebSite, founder).
  const siteJsonLd = [
    organizationJsonLd(
      origin,
      returnPolicies.length ? { hasMerchantReturnPolicy: returnPolicies } : {}
    ),
    localBusinessJsonLd(origin),
    websiteJsonLd(origin, countryCode),
    founderJsonLd(origin),
  ]

  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  return (
    <>
      <JsonLd data={siteJsonLd} />
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
