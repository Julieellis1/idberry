import { formatPostDate, getPostMetas, JOURNAL_NAME } from "@lib/journal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

/** Homepage rail: the three newest Glow Journal posts, real data only. */
export default function JournalRail() {
  const posts = getPostMetas().slice(0, 3)
  if (!posts.length) {
    return null
  }

  return (
    <section
      id="journal"
      aria-labelledby="journal-rail-heading"
      className="bg-blush/40 py-20"
    >
      <div className="content-container">
        <div className="flex flex-col small:flex-row small:items-end justify-between gap-4 mb-10">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs text-berry">
              {JOURNAL_NAME}
            </span>
            <h2
              id="journal-rail-heading"
              className="font-serif text-4xl small:text-5xl text-ink mt-3"
            >
              Notes on{" "}
              <span className="italic text-berry">melanin-rich skin.</span>
            </h2>
          </div>
          <LocalizedClientLink
            href="/journal"
            className="text-sm uppercase tracking-[0.2em] text-berry underline underline-offset-4 hover:text-gold"
          >
            Read the Journal
          </LocalizedClientLink>
        </div>
        <ul className="grid grid-cols-1 small:grid-cols-3 gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-blush bg-white hover:shadow-lg transition-shadow">
                <LocalizedClientLink
                  href={`/journal/${post.slug}`}
                  className="block aspect-[4/3] overflow-hidden bg-blush/40"
                  aria-hidden
                  tabIndex={-1}
                >
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.imageAlt || ""}
                      fill={false}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </LocalizedClientLink>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em]">
                    <LocalizedClientLink
                      href={`/journal/category/${post.categorySlug}`}
                      className="text-gold hover:text-berry"
                    >
                      {post.category}
                    </LocalizedClientLink>
                    <span className="text-ink/40" aria-hidden>
                      ·
                    </span>
                    <time dateTime={post.date} className="text-ink/60">
                      {formatPostDate(post.date)}
                    </time>
                    <span className="text-ink/40" aria-hidden>
                      ·
                    </span>
                    <span className="text-ink/60">
                      {post.readingMinutes} min read
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl leading-snug text-ink">
                    <LocalizedClientLink
                      href={`/journal/${post.slug}`}
                      className="hover:text-berry"
                    >
                      {post.title}
                    </LocalizedClientLink>
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
