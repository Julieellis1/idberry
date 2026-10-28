import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import CollectionsGrid from "@modules/home/components/idberry/collections-grid"
import Faq from "@modules/home/components/idberry/faq"
import { FeaturedProductsSection, ShopProductsSection } from "@modules/home/components/idberry/home-products"
import OurStory from "@modules/home/components/idberry/our-story"
import ShopByConcern from "@modules/home/components/idberry/shop-by-concern"
import WholesaleCta from "@modules/home/components/idberry/wholesale-cta"
import { BRAND } from "@lib/idberry"
import { getRegion, listRegions } from "@lib/data/regions"
import { getSiteOrigin, listCountryCodes } from "@lib/util/site"
import { buildPageMetadata } from "@lib/seo"
import JournalRail from "@modules/journal/components/journal-rail"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  const [origin, regions] = await Promise.all([getSiteOrigin(), listRegions()])

  const base = await buildPageMetadata({
    title: "Luxury Skincare",
    description: BRAND.description,
    countryCode,
  })

  return {
    ...base,
    title: { absolute: `${BRAND.name} | Luxury Skincare` },
    alternates: {
      canonical: `${origin}/${countryCode}`,
      languages: {
        ...Object.fromEntries(
          listCountryCodes(regions).map((code) => [
            `en-${code.toUpperCase()}`,
            `${origin}/${code}`,
          ])
        ),
        "x-default": origin,
      },
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  return (
    <>
      <Hero />
      <FeaturedProductsSection region={region} />
      <CollectionsGrid />
      <ShopProductsSection region={region} />
      <ShopByConcern />
      <OurStory />
      <JournalRail />
      <WholesaleCta />
      <Faq />
    </>
  )
}
