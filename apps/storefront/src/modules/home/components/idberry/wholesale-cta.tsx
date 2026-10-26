import { WHOLESALE, whatsappLink } from "@lib/idberry"

export default function WholesaleCta() {
  return (
    <section className="content-container py-20">
      <div className="rounded-3xl border border-gold/50 bg-gradient-to-br from-blush via-ivory to-blush p-10 small:p-16 text-center">
        <span className="uppercase tracking-[0.3em] text-xs text-gold">
          Wholesale &amp; Private Label
        </span>
        <h2 className="font-serif text-4xl small:text-5xl text-berry mt-3 max-w-2xl mx-auto">
          {WHOLESALE.title}
        </h2>
        <p className="mt-4 text-ink/70">{WHOLESALE.body}</p>
        <a
          href={whatsappLink(WHOLESALE.message)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-berry px-8 py-3 text-sm uppercase tracking-widest text-ivory hover:bg-berry-dark"
        >
          {WHOLESALE.cta}
        </a>
      </div>
    </section>
  )
}
