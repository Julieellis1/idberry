import { Metadata } from "next"
import { getPostMetas, JOURNAL_DESCRIPTION, JOURNAL_NAME, paginate } from "@lib/journal"
import { buildPageMetadata, journalCanonicalCountry } from "@lib/seo"
import { getSiteOrigin } from "@lib/util/site"
import JournalIndexTemplate from "@modules/journal/templates/journal-index"

export const dynamic = "force-static"
export const revalidate = 3600

type Props = { params: Promise<{ countryCode: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { countryCode } = await props.params
  return buildPageMetadata({
    title: `${JOURNAL_NAME}: Skincare for Melanin-Rich Skin`,
    description: JOURNAL_DESCRIPTION,
    countryCode,
    canonicalCountry: journalCanonicalCountry,
    path: "/journal",
  })
}

export default async function JournalPage(props: Props) {
  await props.params
  const origin = await getSiteOrigin()
  const { items, page, totalPages } = paginate(getPostMetas(), 1)
  return (
    <JournalIndexTemplate
      posts={items}
      page={page}
      totalPages={totalPages}
      origin={origin}
      canonicalCountry={journalCanonicalCountry}
    />
  )
}
