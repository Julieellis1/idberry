import { Metadata } from "next"
import { buildPageMetadata } from "@lib/seo"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import StoreTemplate from "@modules/store/templates"

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  return buildPageMetadata({
    title: "Shop All Skincare",
    description: "Shop every IDBERRY Beauty ritual: radiance sets, soaps, creams, lotions, serums and targeted care for melanin-rich skin. Delivered nationwide and internationally.",
    countryCode,
    path: "/store",
  })
}

export default async function StorePage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <StoreTemplate currencyCode={region.currency_code} />
}
