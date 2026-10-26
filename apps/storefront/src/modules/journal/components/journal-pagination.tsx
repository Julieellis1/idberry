import LocalizedClientLink from "@modules/common/components/localized-client-link"

/** Crawlable prev/next pagination. `basePath` is e.g. "/journal" or "/journal/category/rituals". */
export default function JournalPagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) {
    return null
  }
  const href = (p: number) => (p <= 1 ? basePath : `${basePath}/page/${p}`)

  return (
    <nav
      aria-label="Journal pagination"
      className="mt-14 flex items-center justify-center gap-6 text-sm"
    >
      {page > 1 ? (
        <LocalizedClientLink href={href(page - 1)} rel="prev" className="text-berry hover:text-gold">
          ← Newer posts
        </LocalizedClientLink>
      ) : (
        <span className="text-ink/30">← Newer posts</span>
      )}
      <span className="text-ink/60">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <LocalizedClientLink href={href(page + 1)} rel="next" className="text-berry hover:text-gold">
          Older posts →
        </LocalizedClientLink>
      ) : (
        <span className="text-ink/30">Older posts →</span>
      )}
    </nav>
  )
}
