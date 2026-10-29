import { CONSULTATION, FAQ, whatsappLink } from "@lib/idberry"

export default function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  return (
    <section id="faq" className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="content-container grid grid-cols-1 small:grid-cols-2 gap-12 items-start">
        <div>
          <span className="uppercase tracking-[0.3em] text-xs text-berry">
            FAQ
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-ink mt-3">
            Questions, <span className="italic text-berry">answered.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-ink/70">
            Still unsure? Our cosmetologists answer on WhatsApp, free.
          </p>
          <a
            href={whatsappLink(CONSULTATION.message)}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm uppercase tracking-[0.2em] text-berry underline underline-offset-4 hover:text-gold"
          >
            Ask a skin expert
          </a>
        </div>
        <div className="divide-y divide-blush border-y border-blush">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-ink">
                {f.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-transform group-open:rotate-45 text-2xl leading-none" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink/70 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
