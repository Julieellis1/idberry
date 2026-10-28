import {
  getCategories,
  JOURNAL_DESCRIPTION,
  JOURNAL_NAME,
  JournalPostMeta,
} from "@lib/journal"
import { breadcrumbJsonLd, ids } from "@lib/seo"
import JsonLd from "@modules/common/components/json-ld"
import Breadcrumbs from "../components/breadcrumbs"
import CategoryFilter from "../components/category-filter"
import JournalPagination from "../components/journal-pagination"
import PostCard from "../components/post-card"

/** Shared listing template for /journal, /journal/page/N and /journal/category/X. */
export default function JournalIndexTemplate({
  posts,
  page,
  totalPages,
  origin,
  canonicalCountry,
  category,
}: {
  posts: JournalPostMeta[]
  page: number
  totalPages: number
  origin: string
  canonicalCountry: string
  category?: { name: string; slug: string }
}) {
  const basePath = category ? `/journal/category/${category.slug}` : "/journal"
  const pageUrl = `${origin}/${canonicalCountry}${basePath}${page > 1 ? `/page/${page}` : ""}`
  const journalUrl = `${origin}/${canonicalCountry}/journal`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": category ? "CollectionPage" : "Blog",
      "@id": `${pageUrl}#page`,
      name: category ? `${category.name} | ${JOURNAL_NAME}` : JOURNAL_NAME,
      description: JOURNAL_DESCRIPTION,
      url: pageUrl,
      inLanguage: "en",
      publisher: { "@id": ids(origin).organization },
      isPartOf: { "@id": ids(origin).website },
      [category ? "hasPart" : "blogPost"]: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        url: `${origin}/${canonicalCountry}/journal/${p.slug}`,
        datePublished: p.date,
        dateModified: p.updated,
        image: p.image || undefined,
        author: { "@id": ids(origin).founder },
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", url: `${origin}/${canonicalCountry}` },
      { name: JOURNAL_NAME, url: journalUrl },
      ...(category ? [{ name: category.name, url: `${journalUrl}/category/${category.slug}` }] : []),
    ]),
  ]

  return (
    <div className="content-container py-12 small:py-16">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          ...(category
            ? [{ name: JOURNAL_NAME, href: "/journal" }, { name: category.name }]
            : [{ name: JOURNAL_NAME }]),
        ]}
      />
      <header className="max-w-3xl mt-6 mb-10">
        <span className="uppercase tracking-[0.3em] text-xs text-gold">
          {category ? JOURNAL_NAME : "IDBERRY Beauty"}
        </span>
        <h1 className="font-serif text-5xl small:text-6xl text-berry mt-3">
          {category ? category.name : JOURNAL_NAME}
        </h1>
        <p className="mt-4 text-lg text-ink/70 leading-relaxed">
          {category
            ? `${category.name} articles from ${JOURNAL_NAME}: practical skincare guidance for melanin-rich skin from our studio.`
            : JOURNAL_DESCRIPTION}
        </p>
      </header>
      <div className="mb-10">
        <CategoryFilter categories={getCategories()} active={category?.slug} />
      </div>
      {posts.length ? (
        <ul className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-ink/60">No articles yet. Check back soon.</p>
      )}
      <JournalPagination basePath={basePath} page={page} totalPages={totalPages} />
    </div>
  )
}
