import { FAQ } from "@lib/idberry"

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
    <section id="faq" className="bg-white/60 border-t border-blush py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="content-container max-w-3xl">
        <h2 className="font-serif text-4xl small:text-5xl text-berry text-center mb-10">
          Questions, answered
        </h2>
        <div className="divide-y divide-blush border-y border-blush">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-ink">
                {f.q}
                <span className="text-gold transition-transform group-open:rotate-45 text-2xl leading-none" aria-hidden>
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
