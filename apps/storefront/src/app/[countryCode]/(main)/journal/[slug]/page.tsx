/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next"
import { notFound } from "next/navigation"

import { AUTHORS, FOUNDER } from "@lib/idberry"
import {
  formatPostDate,
  getPostBySlug,
  getRelatedPosts,
  JOURNAL_NAME,
} from "@lib/journal"
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqJsonLd,
  ids,
  journalCanonicalCountry,
} from "@lib/seo"
import { getSiteOrigin } from "@lib/util/site"
import JsonLd from "@modules/common/components/json-ld"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AuthorBio from "@modules/journal/components/author-bio"
import Breadcrumbs from "@modules/journal/components/breadcrumbs"
import KeyTakeaways from "@modules/journal/components/key-takeaways"
import MdxContent from "@modules/journal/components/mdx-content"
import PostCard from "@modules/journal/components/post-card"
import PostFaq from "@modules/journal/components/post-faq"
import ShopTheRitual from "@modules/journal/components/shop-the-ritual"
import TableOfContents from "@modules/journal/components/table-of-contents"

export const dynamic = "force-static"
export const revalidate = 3600

type Props = { params: Promise<{ countryCode: string; slug: string }> }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { countryCode, slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const author = AUTHORS[post.author] ?? FOUNDER

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    countryCode,
    canonicalCountry: journalCanonicalCountry,
    path: `/journal/${post.slug}`,
    image: post.image,
    imageAlt: post.imageAlt,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [author.name],
    tags: post.tags,
  })
}

export default async function JournalPostPage(props: Props) {
  const { countryCode, slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const origin = await getSiteOrigin()
  const author = AUTHORS[post.author] ?? FOUNDER
  const canonical = `${origin}/${journalCanonicalCountry}/journal/${post.slug}`
  const journalUrl = `${origin}/${journalCanonicalCountry}/journal`
  const related = getRelatedPosts(post)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      headline: post.title,
      description: post.description,
      image: post.image ? [post.image] : undefined,
      datePublished: post.date,
      dateModified: post.updated,
      author: {
        "@type": "Person",
        "@id": ids(origin).founder,
        name: author.name,
        alternateName: author.alternateName,
        jobTitle: author.jobTitle,
        url: `${origin}/${journalCanonicalCountry}/journal/sweet-like-berry-story-behind-idberry`,
      },
      publisher: { "@id": ids(origin).organization },
      isPartOf: { "@type": "Blog", name: JOURNAL_NAME, url: journalUrl },
      articleSection: post.category,
      keywords: post.tags.join(", "),
      wordCount: post.body.split(/\s+/).filter(Boolean).length,
      inLanguage: "en",
    },
    ...(post.faq.length ? [faqJsonLd(post.faq)] : []),
    breadcrumbJsonLd([
      { name: "Home", url: `${origin}/${journalCanonicalCountry}` },
      { name: JOURNAL_NAME, url: journalUrl },
      { name: post.category, url: `${journalUrl}/category/${post.categorySlug}` },
      { name: post.title, url: canonical },
    ]),
  ]

  return (
    <article className="content-container py-12 small:py-16">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: JOURNAL_NAME, href: "/journal" },
          { name: post.category, href: `/journal/category/${post.categorySlug}` },
          { name: post.title },
        ]}
      />

      <header className="max-w-3xl mt-6">
        <LocalizedClientLink
          href={`/journal/category/${post.categorySlug}`}
          className="uppercase tracking-[0.3em] text-xs text-gold hover:text-berry"
        >
          {post.category}
        </LocalizedClientLink>
        <h1 className="font-serif text-4xl small:text-6xl text-berry mt-3 leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-ink/70 leading-relaxed">{post.description}</p>
        <p className="mt-5 text-sm text-ink/60 flex flex-wrap gap-x-3 gap-y-1">
          <span>
            By <span className="text-berry">{author.displayName}</span>
          </span>
          <span aria-hidden>·</span>
          <span>
            Published <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          {post.updated && post.updated !== post.date && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </p>
      </header>

      {post.image && (
        <figure className="mt-10 overflow-hidden rounded-2xl bg-blush/40 aspect-[16/9] max-h-[520px]">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </figure>
      )}

      <div className="mt-12 grid grid-cols-1 small:grid-cols-[minmax(0,1fr)_240px] gap-12">
        <div className="max-w-3xl">
          <KeyTakeaways items={post.keyTakeaways} />
          <div className="mt-8 small:hidden">
            <TableOfContents headings={post.headings} idSuffix="-mobile" />
          </div>
          <div className="mt-8 text-[17px]">
            <MdxContent source={post.body} />
          </div>
          <p className="mt-10 rounded-xl border border-blush bg-white/60 p-5 text-sm text-ink/70 leading-relaxed">
            This article is general skincare guidance, not medical advice. Patch test new
            products, wear sunscreen daily, and see a dermatologist for persistent or
            worsening skin concerns.
          </p>
          <ShopTheRitual handles={post.relatedProducts} countryCode={countryCode} />
          <PostFaq faq={post.faq} />
          <AuthorBio authorKey={post.author} />
        </div>
        <aside className="hidden small:block">
          <div className="sticky top-32">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-posts" className="mt-20 border-t border-blush pt-14">
          <h2 id="related-posts" className="font-serif text-3xl small:text-4xl text-berry mb-8">
            Keep reading
          </h2>
          <ul className="grid grid-cols-1 small:grid-cols-3 gap-8">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
