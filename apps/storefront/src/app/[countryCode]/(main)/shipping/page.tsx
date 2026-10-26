import { Metadata } from "next"
import { buildPageMetadata } from "@lib/seo"

import { getStorePolicies } from "@lib/data/store-policies"
import {
  PoliciesUnavailable,
  PolicyPage,
  ShippingSummary,
} from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  return buildPageMetadata({
    title: "Shipping information",
    description: "Shipping rates and delivery times for IDBERRY Beauty orders in Lagos, across Nigeria and internationally.",
    countryCode,
    path: "/shipping",
  })
}

export default async function ShippingPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const { current, currencyCode } = await getStorePolicies(countryCode)

  return (
    <PolicyPage title="Shipping information">
      {current ? (
        <>
          <p>
            Orders to {countryCode.toUpperCase()} ship with the following rates
            and delivery times.
          </p>
          <ShippingSummary policies={current} currencyCode={currencyCode} />
          <p className="text-ui-fg-subtle">
            Available shipping methods and final costs are shown at checkout.
          </p>
        </>
      ) : (
        <PoliciesUnavailable />
      )}
    </PolicyPage>
  )
}
