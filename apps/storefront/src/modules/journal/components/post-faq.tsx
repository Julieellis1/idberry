import { JournalFaq } from "@lib/journal"

export default function PostFaq({ faq }: { faq: JournalFaq[] }) {
  if (!faq.length) {
    return null
  }
  return (
    <section aria-labelledby="post-faq" className="mt-16">
      <h2 id="post-faq" className="font-serif text-3xl small:text-4xl text-berry mb-6">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-blush border-y border-blush">
        {faq.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-ink">
              <h3 className="font-serif text-xl">{f.q}</h3>
              <span
                className="text-gold transition-transform group-open:rotate-45 text-2xl leading-none"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-ink/70 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
