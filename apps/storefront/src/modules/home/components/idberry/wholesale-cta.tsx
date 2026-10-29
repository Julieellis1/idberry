import { WHOLESALE, whatsappLink } from "@lib/idberry"

export default function WholesaleCta() {
  return (
    <section className="py-10">
      <div className="content-container">
        <div className="rounded-[28px] bg-berry-dark px-6 py-12 small:px-12 small:py-16 text-ivory overflow-hidden">
          <div className="flex flex-col small:flex-row small:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="uppercase tracking-[0.3em] text-xs text-gold">
                Wholesale &amp; Private Label
              </span>
              <h2 className="font-serif text-4xl small:text-5xl mt-3">
                Build your own beauty brand{" "}
                <span className="italic text-gold">with IDBERRY.</span>
              </h2>
              <p className="mt-4 text-ivory/80">{WHOLESALE.body}</p>
            </div>
            <a
              href={whatsappLink(WHOLESALE.message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-ivory px-8 py-3 text-sm uppercase tracking-widest text-ink hover:bg-white"
            >
              {WHOLESALE.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
