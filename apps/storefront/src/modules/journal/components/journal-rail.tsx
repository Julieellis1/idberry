import { getPostMetas, JOURNAL_NAME } from "@lib/journal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PostCard from "./post-card"

/** Homepage rail: the three newest Glow Journal posts. */
export default function JournalRail() {
  const posts = getPostMetas().slice(0, 3)
  if (!posts.length) {
    return null
  }

  return (
    <section
      id="journal"
      aria-labelledby="journal-rail-heading"
      className="content-container py-20"
    >
      <div className="flex flex-col small:flex-row small:items-end justify-between gap-4 mb-10">
        <div>
          <span className="uppercase tracking-[0.3em] text-xs text-gold">
            {JOURNAL_NAME}
          </span>
          <h2
            id="journal-rail-heading"
            className="font-serif text-4xl small:text-5xl text-berry mt-3"
          >
            Rituals, notes &amp; skin wisdom
          </h2>
        </div>
        <LocalizedClientLink
          href="/journal"
          className="text-sm uppercase tracking-[0.2em] text-berry hover:text-gold"
        >
          Read the Journal →
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-1 small:grid-cols-3 gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}
