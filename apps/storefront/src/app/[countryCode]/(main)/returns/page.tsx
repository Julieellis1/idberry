import { Metadata } from "next"
import { buildPageMetadata } from "@lib/seo"

import { getStorePolicies } from "@lib/data/store-policies"
import { PoliciesUnavailable, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  return buildPageMetadata({
    title: "Return policy",
    description: "IDBERRY Beauty returns: 7-day replacement warranty for wrong or defective items. How to contact us and what qualifies.",
    countryCode,
    path: "/returns",
  })
}

export default async function ReturnsPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const { current } = await getStorePolicies(countryCode)

  return (
    <PolicyPage title="Return policy">
      {current ? (
        <>
          <p>
            You can return items within {current.returnWindowDays} days of
            delivery. Items are returned by mail.
          </p>
          <p>
            {current.freeReturns
              ? "Return shipping is free."
              : "Return shipping costs are paid by the customer."}
          </p>
        </>
      ) : (
        <PoliciesUnavailable />
      )}
    </PolicyPage>
  )
}
