import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CollectionsGrid from "@modules/home/components/idberry/collections-grid"
import Faq from "@modules/home/components/idberry/faq"
import OurStory from "@modules/home/components/idberry/our-story"
import ShopByConcern from "@modules/home/components/idberry/shop-by-concern"
import WholesaleCta from "@modules/home/components/idberry/wholesale-cta"
import { BRAND } from "@lib/idberry"
import { listCollections } from "@lib/data/collections"
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
    title: "Luxury Skincare, Made in Lagos",
    description: BRAND.description,
    countryCode,
  })

  return {
    ...base,
    title: { absolute: `${BRAND.name} | Luxury Skincare, Made in Lagos` },
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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })


  return (
    <>
      <Hero />
      <CollectionsGrid />
      <ShopByConcern />
      {collections && collections.length > 0 && region && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts
              collections={collections.slice(0, 3)}
              region={region}
            />
          </ul>
        </div>
      )}
      <JournalRail />
      <OurStory />
      <WholesaleCta />
      <Faq />
    </>
  )
}
