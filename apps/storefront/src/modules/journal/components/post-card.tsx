/* eslint-disable @next/next/no-img-element */
import { formatPostDate, JournalPostMeta } from "@lib/journal"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PostCard({
  post,
  headingLevel = "h3",
}: {
  post: JournalPostMeta
  headingLevel?: "h2" | "h3"
}) {
  const Heading = headingLevel
  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden border border-blush bg-white/60 hover:border-gold transition-colors">
      <LocalizedClientLink
        href={`/journal/${post.slug}`}
        className="block aspect-[4/3] overflow-hidden bg-blush/40"
        aria-hidden
        tabIndex={-1}
      >
        {post.image && (
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </LocalizedClientLink>
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em]">
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
        </div>
        <Heading className="font-serif text-2xl leading-snug text-berry">
          <LocalizedClientLink
            href={`/journal/${post.slug}`}
            className="hover:text-berry-dark"
          >
            {post.title}
          </LocalizedClientLink>
        </Heading>
        <p className="text-sm text-ink/70 leading-relaxed flex-1">
          {post.description}
        </p>
        <span className="text-xs text-ink/50">
          {post.readingMinutes} min read
        </span>
      </div>
    </article>
  )
}
