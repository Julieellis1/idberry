import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCategoryBySlug, getPostMetas, JOURNAL_NAME, paginate } from "@lib/journal"
import { buildPageMetadata, journalCanonicalCountry } from "@lib/seo"
import { getSiteOrigin } from "@lib/util/site"
import JournalIndexTemplate from "@modules/journal/templates/journal-index"

export const dynamic = "force-static"
export const revalidate = 3600

type Props = { params: Promise<{ countryCode: string; category: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { countryCode, category } = await props.params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()
  return buildPageMetadata({
    title: `${cat.name} | ${JOURNAL_NAME}`,
    description: `${cat.name} articles from ${JOURNAL_NAME} by IDBERRY Beauty: practical, gentle skincare guidance for melanin-rich skin from Lagos.`,
    countryCode,
    canonicalCountry: journalCanonicalCountry,
    path: `/journal/category/${cat.slug}`,
  })
}

export default async function JournalCategoryPage(props: Props) {
  const { category } = await props.params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()
  const origin = await getSiteOrigin()
  const { items, page, totalPages } = paginate(
    getPostMetas().filter((p) => p.categorySlug === cat.slug),
    1
  )
  return (
    <JournalIndexTemplate
      posts={items}
      page={page}
      totalPages={totalPages}
      origin={origin}
      canonicalCountry={journalCanonicalCountry}
      category={cat}
    />
  )
}
