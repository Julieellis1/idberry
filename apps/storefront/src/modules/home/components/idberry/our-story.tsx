import { FOUNDER_QUOTE, PILLARS, STORY } from "@lib/idberry"

export default function OurStory() {
  return (
    <>
      <section id="our-story" className="content-container py-20 grid grid-cols-1 small:grid-cols-2 gap-12 items-start">
        <div>
          <span className="uppercase tracking-[0.3em] text-xs text-gold">
            {STORY.eyebrow}
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-berry mt-3">
            {STORY.title}
          </h2>
          <p className="mt-6 font-serif italic text-xl text-ink/80">
            {STORY.mission}
          </p>
        </div>
        <div className="flex flex-col gap-5 text-ink/80 leading-relaxed">
          {STORY.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <ul className="grid grid-cols-2 gap-3 pt-4">
            {PILLARS.map((pillar) => (
              <li
                key={pillar}
                className="rounded-xl border border-gold/40 bg-white/60 px-4 py-3 text-sm text-berry"
              >
                <span className="text-gold mr-2" aria-hidden>✦</span>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-berry text-ivory py-20">
        <figure className="content-container max-w-3xl text-center">
          <span className="font-serif text-6xl text-gold leading-none" aria-hidden>
            &ldquo;
          </span>
          <blockquote className="font-serif italic text-3xl small:text-4xl leading-snug">
            {FOUNDER_QUOTE.quote}
          </blockquote>
          <figcaption className="mt-6 text-sm uppercase tracking-[0.25em] text-blush">
            {FOUNDER_QUOTE.attribution} · {FOUNDER_QUOTE.role}
          </figcaption>
        </figure>
      </section>
    </>
  )
}
