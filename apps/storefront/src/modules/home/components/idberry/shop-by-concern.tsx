import { CONCERNS, CONSULTATION, whatsappLink } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function ShopByConcern() {
  return (
    <section
      id="shop-by-concern"
      className="relative overflow-hidden bg-berry-dark py-20 scroll-mt-20"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/videos/idberry-hero-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-berry-dark/70 via-berry-dark/60 to-berry-dark/85" />
      </div>
      <div className="content-container relative z-10">
        <div className="text-center mb-10">
          <span className="uppercase tracking-[0.3em] text-xs text-gold">
            Find your ritual
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-ivory mt-3">
            Shop by concern
          </h2>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-5 gap-4">
          {CONCERNS.map((c) => (
            <li key={c.handle}>
              <LocalizedClientLink
                href={`/categories/${c.handle}`}
                className="flex h-full flex-col items-center justify-center gap-2 rounded-full aspect-square bg-white/10 border border-white/25 text-center p-4 hover:bg-ivory transition-colors group"
              >
                <span className="font-serif text-xl small:text-2xl text-ivory group-hover:text-berry leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-blush/80 group-hover:text-berry/70">
                  {c.note}
                </span>
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <p className="font-serif text-2xl text-ivory">{CONSULTATION.title}</p>
          <p className="text-ivory/80 mt-1">{CONSULTATION.body}</p>
          <a
            href={whatsappLink(CONSULTATION.message)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-ivory px-8 py-3 text-sm uppercase tracking-widest text-ink hover:bg-white"
          >
            {CONSULTATION.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
