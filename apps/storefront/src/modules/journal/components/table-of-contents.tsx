import { JournalHeading } from "@lib/journal"

export default function TableOfContents({
  headings,
  idSuffix = "",
}: {
  headings: JournalHeading[]
  idSuffix?: string
}) {
  const headingId = `toc-heading${idSuffix}`
  if (headings.length < 2) {
    return null
  }
  return (
    <nav aria-labelledby={headingId} className="text-sm">
      <h2
        id={headingId}
        className="uppercase tracking-[0.25em] text-[11px] text-gold mb-4"
      >
        In this article
      </h2>
      <ol className="flex flex-col gap-3 border-l border-blush pl-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="text-ink/70 hover:text-berry leading-snug block">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
