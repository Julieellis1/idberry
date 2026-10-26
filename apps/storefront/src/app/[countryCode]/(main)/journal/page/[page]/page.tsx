import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostMetas, JOURNAL_DESCRIPTION, JOURNAL_NAME, paginate } from "@lib/journal"
import { buildPageMetadata, journalCanonicalCountry } from "@lib/seo"
import { getSiteOrigin } from "@lib/util/site"
import JournalIndexTemplate from "@modules/journal/templates/journal-index"

export const dynamic = "force-static"
export const revalidate = 3600

type Props = { params: Promise<{ countryCode: string; page: string }> }

const parsePage = (value: string) => {
  const n = Number(value)
  return Number.isInteger(n) && n >= 2 ? n : null
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { countryCode, page } = await props.params
  const n = parsePage(page)
  if (!n) notFound()
  return buildPageMetadata({
    title: `${JOURNAL_NAME} – Page ${n}`,
    description: JOURNAL_DESCRIPTION,
    countryCode,
    canonicalCountry: journalCanonicalCountry,
    path: `/journal/page/${n}`,
  })
}

export default async function JournalPagedPage(props: Props) {
  const { page } = await props.params
  const n = parsePage(page)
  const all = getPostMetas()
  const result = paginate(all, n ?? 0)
  if (!n || n > result.totalPages) notFound()
  const origin = await getSiteOrigin()
  return (
    <JournalIndexTemplate
      posts={result.items}
      page={result.page}
      totalPages={result.totalPages}
      origin={origin}
      canonicalCountry={journalCanonicalCountry}
    />
  )
}
