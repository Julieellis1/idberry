import { HERO, TRUST_BAR } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const HERO_IMAGE =
  "https://idberrybeauty.com/wp-content/uploads/2024/02/IMG_2480.jpg"

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-ivory">
      <div className="content-container grid grid-cols-1 small:grid-cols-2 gap-10 items-center py-16 small:py-24">
        <div className="flex flex-col gap-6 text-center small:text-left">
          <span className="uppercase tracking-[0.3em] text-xs text-gold">
            IDBERRY Beauty · Lagos
          </span>
          <h1 className="font-serif text-5xl small:text-7xl leading-[1.05] text-berry">
            {HERO.title}
          </h1>
          <p className="text-lg small:text-xl text-ink/80 max-w-md mx-auto small:mx-0">
            {HERO.subtitle}
          </p>
          <div className="flex flex-col xsmall:flex-row gap-3 justify-center small:justify-start pt-2">
            <LocalizedClientLink
              href={HERO.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-berry px-8 py-3 text-sm uppercase tracking-widest text-ivory hover:bg-berry-dark transition-colors"
            >
              {HERO.primaryCta.label}
            </LocalizedClientLink>
            <a
              href={HERO.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-berry px-8 py-3 text-sm uppercase tracking-widest text-berry hover:bg-blush/60 transition-colors"
            >
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto small:max-w-none rounded-t-full overflow-hidden bg-blush">
          <Image
            src={HERO_IMAGE}
            alt="IDBERRY Snow White radiance ritual"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/40 rounded-t-full" />
        </div>
      </div>
      <TrustBar />
    </section>
  )
}

export const TrustBar = () => (
  <div className="w-full border-y border-gold/30 bg-berry text-ivory">
    <ul className="content-container grid grid-cols-2 small:grid-cols-4 gap-y-3 py-4 text-center text-xs small:text-sm tracking-wide">
      {TRUST_BAR.map((item) => (
        <li key={item} className="flex items-center justify-center gap-2">
          <span aria-hidden className="text-gold">✦</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export default Hero
