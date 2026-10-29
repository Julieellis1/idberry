import { CONCERNS, CONSULTATION, whatsappLink } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ShopByConcern() {
  return (
    <section id="shop-by-concern" className="py-20 scroll-mt-20">
      <div className="content-container">
        <div className="mb-10">
          <span className="uppercase tracking-[0.3em] text-xs text-berry">
            Shop by Concern
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-ink mt-3">
            Start with what <span className="italic text-berry">matters</span>{" "}
            to you.
          </h2>
        </div>
        <ul className="flex flex-wrap gap-4">
          {CONCERNS.map((c) => (
            <li key={c.handle}>
              <LocalizedClientLink
                href={`/categories/${c.handle}`}
                className="flex items-center gap-4 rounded-full border border-berry/30 bg-white py-3 pl-3 pr-6 hover:border-berry hover:shadow-md transition-shadow group"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush/60 font-serif text-xl text-berry"
                >
                  ✦
                </span>
                <span className="text-left">
                  <span className="block font-serif text-xl leading-tight text-ink">
                    {c.name}
                  </span>
                  <span className="block text-[11px] uppercase tracking-widest text-ink/60">
                    {c.note}
                  </span>
                </span>
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <p className="font-serif text-2xl text-ink">{CONSULTATION.title}</p>
          <p className="text-ink/70 mt-1">{CONSULTATION.body}</p>
          <a
            href={whatsappLink(CONSULTATION.message)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-berry px-8 py-3 text-sm uppercase tracking-widest text-ivory hover:bg-berry-dark"
          >
            {CONSULTATION.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
