import { RITUAL_STEPS } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function BuildYourRitual() {
  return (
    <section className="bg-blush/40 py-20" aria-labelledby="ritual-heading">
      <div className="content-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs text-berry">
              Build Your Ritual
            </span>
            <h2
              id="ritual-heading"
              className="font-serif text-4xl small:text-5xl text-ink mt-3"
            >
              Four steps to <span className="italic text-berry">radiance.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70">
            Rituals, not random products. Each step prepares your skin for the
            next.
          </p>
        </div>
        <ul className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-4 gap-6">
          {RITUAL_STEPS.map((step) => (
            <li
              key={step.step}
              className="flex h-full flex-col overflow-hidden rounded-[28px] border border-blush bg-white"
            >
              {step.handle ? (
                <LocalizedClientLink
                  href={`/products/${step.handle}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-blush/40">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 512px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </LocalizedClientLink>
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-gradient-to-br from-gold/70 via-gold/40 to-blush px-6 text-center">
                  <span className="uppercase tracking-[0.3em] text-xs text-berry">
                    Coming soon
                  </span>
                  <span className="font-serif text-2xl italic text-berry">
                    Protect
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs uppercase tracking-[0.25em] text-gold">
                  {step.step}
                </span>
                <h3 className="font-serif text-2xl text-ink mt-2">
                  {step.name}
                </h3>
                {step.title && (
                  <LocalizedClientLink
                    href={`/products/${step.handle}`}
                    className="mt-1 text-sm font-medium text-berry hover:text-berry-dark"
                  >
                    {step.title}
                  </LocalizedClientLink>
                )}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                  {step.copy}
                </p>
                <span className="mt-4 inline-flex w-fit rounded-full bg-blush/60 px-3 py-1 text-xs text-berry">
                  {step.frequency}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col small:flex-row small:items-center justify-between gap-5 rounded-[28px] bg-blush px-8 py-8 small:px-12">
          <div>
            <h3 className="font-serif text-3xl small:text-4xl text-ink">
              Get the full Snow White ritual
            </h3>
            <p className="mt-2 text-ink/70">
              Cleanse, exfoliate and treat in one set.
            </p>
          </div>
          <LocalizedClientLink
            href="/collections/snow-white"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-ivory px-8 py-3 text-sm uppercase tracking-widest text-ink hover:bg-white"
          >
            Shop the ritual set
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
