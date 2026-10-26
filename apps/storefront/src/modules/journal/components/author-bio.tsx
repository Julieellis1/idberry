import { AUTHORS, FOUNDER, whatsappLink, CONSULTATION } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AuthorBio({ authorKey }: { authorKey: string }) {
  const author = AUTHORS[authorKey] ?? FOUNDER
  const initials = author.name
    .split(" ")
    .map((p) => p[0])
    .join("")

  return (
    <section
      aria-label="About the author"
      className="mt-16 rounded-2xl bg-berry text-ivory p-6 small:p-8 flex flex-col small:flex-row gap-6"
    >
      <div
        aria-hidden
        className="h-16 w-16 shrink-0 rounded-full bg-gold/30 border border-gold flex items-center justify-center font-serif text-2xl text-ivory"
      >
        {initials}
      </div>
      <div className="flex flex-col gap-3">
        <span className="uppercase tracking-[0.25em] text-[11px] text-blush">
          Written by
        </span>
        <p className="font-serif text-2xl">{author.displayName}</p>
        <p className="text-sm text-blush">{author.jobTitle}</p>
        <p className="text-sm leading-relaxed text-ivory/85">{author.shortBio}</p>
        <div className="flex flex-wrap gap-4 text-sm pt-1">
          <LocalizedClientLink
            href="/journal/sweet-like-berry-story-behind-idberry"
            className="text-gold hover:text-ivory"
          >
            Read her story →
          </LocalizedClientLink>
          <a
            href={whatsappLink(CONSULTATION.message)}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-ivory"
          >
            Book a free WhatsApp consultation →
          </a>
        </div>
      </div>
    </section>
  )
}
