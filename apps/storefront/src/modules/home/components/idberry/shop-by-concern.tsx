import { CONCERNS, CONSULTATION, whatsappLink } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ShopByConcern() {
  return (
    <section id="shop-by-concern" className="bg-blush/50 py-20 scroll-mt-20">
      <div className="content-container">
        <div className="text-center mb-10">
          <span className="uppercase tracking-[0.3em] text-xs text-gold">
            Find your ritual
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-berry mt-3">
            Shop by concern
          </h2>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-5 gap-4">
          {CONCERNS.map((c) => (
            <li key={c.handle}>
              <LocalizedClientLink
                href={`/categories/${c.handle}`}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-full aspect-square bg-ivory border border-gold/40 text-center p-4 hover:bg-berry hover:text-ivory transition-colors group"
              >
                <span className="font-serif text-xl small:text-2xl text-berry group-hover:text-ivory leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-ink/60 group-hover:text-blush">
                  {c.note}
                </span>
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <p className="font-serif text-2xl text-berry">{CONSULTATION.title}</p>
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
