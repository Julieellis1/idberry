import { COLLECTIONS, FOUNDER_QUOTE, PILLARS, STORY } from "@lib/idberry"
import Image from "next/image"

const storyImage =
  COLLECTIONS.find((c) => c.handle === "royal-customized")?.image ??
  COLLECTIONS[0].image

export default function OurStory() {
  return (
    <>
      <section
        id="our-story"
        className="content-container py-20 grid grid-cols-1 small:grid-cols-2 gap-12 items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-blush/40">
          <Image
            src={storyImage}
            alt="IDBERRY skincare sets"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <span className="uppercase tracking-[0.3em] text-xs text-berry">
            {STORY.eyebrow}
          </span>
          <h2 className="font-serif text-4xl small:text-5xl text-ink mt-3">
            IDBERRY began{" "}
            <span className="italic text-berry">with a voice.</span>
          </h2>
          <div className="mt-6 flex flex-col gap-5 text-ink/80 leading-relaxed">
            {STORY.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="font-serif italic text-xl text-ink/80">
              {STORY.mission}
            </p>
          </div>
        </div>
      </section>

      <section className="content-container pb-20">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-berry">
          {PILLARS.map((pillar, index) => (
            <li key={pillar} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden className="text-gold">
                  ✦
                </span>
              )}
              {pillar}
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-1 small:grid-cols-2 gap-6">
          <figure className="rounded-[28px] bg-berry-dark px-8 py-10 text-ivory">
            <span
              className="font-serif text-6xl text-gold leading-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="font-serif italic text-2xl small:text-3xl leading-snug">
              {FOUNDER_QUOTE.quote}
            </blockquote>
            <figcaption className="mt-6 text-sm uppercase tracking-[0.25em] text-blush">
              {FOUNDER_QUOTE.attribution} · {FOUNDER_QUOTE.role}
            </figcaption>
          </figure>
          <div className="flex flex-col justify-center rounded-[28px] border border-berry/30 bg-white px-8 py-10">
            <span className="uppercase tracking-[0.3em] text-xs text-berry">
              Our Promise
            </span>
            <p className="mt-4 font-serif text-2xl small:text-3xl leading-snug text-ink">
              Brightening, never bleaching. We help your skin look even and
              radiant in your own natural shade.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
