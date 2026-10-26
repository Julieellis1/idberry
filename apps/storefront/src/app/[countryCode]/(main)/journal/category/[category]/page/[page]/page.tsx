import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getPostMetas, JOURNAL_NAME, paginate } from "@lib/journal"
import { buildPageMetadata, journalCanonicalCountry } from "@lib/seo"
import { getSiteOrigin } from "@lib/util/site"
import JournalIndexTemplate from "@modules/journal/templates/journal-index"

export const dynamic = "force-static"
export const revalidate = 3600

type Props = {
  params: Promise<{ countryCode: string; category: string; page: string }>
}

const parsePage = (value: string) => {
  const n = Number(value)
  return Number.isInteger(n) && n >= 2 ? n : null
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { countryCode, category, page } = await props.params
  const cat = getCategoryBySlug(category)
  const n = parsePage(page)
  if (!cat || !n) notFound()
  return buildPageMetadata({
    title: `${cat.name} | ${JOURNAL_NAME} – Page ${n}`,
    description: `${cat.name} articles from ${JOURNAL_NAME} by IDBERRY Beauty.`,
    countryCode,
    canonicalCountry: journalCanonicalCountry,
    path: `/journal/category/${cat.slug}/page/${n}`,
  })
}

export default async function JournalCategoryPagedPage(props: Props) {
  const { category, page } = await props.params
  const cat = getCategoryBySlug(category)
  const n = parsePage(page)
  if (!cat || !n) notFound()
  const result = paginate(
    getPostMetas().filter((p) => p.categorySlug === cat.slug),
    n
  )
  if (n > result.totalPages) notFound()
  const origin = await getSiteOrigin()
  return (
    <JournalIndexTemplate
      posts={result.items}
      page={result.page}
      totalPages={result.totalPages}
      origin={origin}
      canonicalCountry={journalCanonicalCountry}
      category={cat}
    />
  )
}
