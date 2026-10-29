"use client"

import { useEffect, useRef, useState } from "react"

import { HERO, HERO_CARDS, TRUST_BAR } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const HeroVideo = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) {
      return
    }
    // Very slow playback. The clip itself is already almost still,
    // this slows it further. Respect reduced motion by holding on the poster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause()
      return
    }
    video.playbackRate = 0.3
    const setRate = () => {
      video.playbackRate = 0.3
    }
    video.addEventListener("loadedmetadata", setRate)
    return () => video.removeEventListener("loadedmetadata", setRate)
  }, [])

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
      src={HERO.video}
      poster={HERO.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    />
  )
}

const Hero = () => {
  return (
    <>
      <section className="relative w-full min-h-[100svh] overflow-hidden bg-black text-ivory">
        {/* Poster shows immediately while the video loads, so the hero
            is never a black screen. The video fades in over it. */}
        <Image
          src={HERO.poster}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full flex-col px-6 pb-16 pt-44 small:px-10 small:pt-48 large:px-14">
          <div className="flex flex-1 items-center">
            <div className="w-full max-w-3xl">
              <div>
                <span className="uppercase tracking-[0.3em] text-xs text-gold">
                  IDBERRY Beauty · Made for melanin-rich skin
                </span>
                <h1 className="mt-6 font-serif text-6xl leading-[1.02] small:text-8xl">
                  Radiance,
                  <br />
                  <span className="italic font-light text-gold">
                    made for you.
                  </span>
                </h1>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-ivory/85">
                  {HERO.subtitle}
                </p>
                <div className="flex flex-col xsmall:flex-row gap-4 pt-10">
                  <LocalizedClientLink
                    href={HERO.primaryCta.href}
                    className="inline-flex items-center justify-center rounded-full bg-ivory px-8 py-3 text-sm uppercase tracking-widest text-ink transition-colors hover:bg-white"
                  >
                    {HERO.primaryCta.label}
                  </LocalizedClientLink>
                  <a
                    href={HERO.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-full border border-ivory/50 bg-white/10 px-8 py-3 text-sm uppercase tracking-widest text-ivory backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    {HERO.secondaryCta.label}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-20 grid grid-cols-1 gap-6 small:grid-cols-3">
            {HERO_CARDS.map((card) => (
              <li
                key={card.handle}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
              >
                <div className="flex gap-4">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <span className="uppercase tracking-[0.2em] text-[11px] text-gold">
                      {card.collection}
                    </span>
                    <h2 className="mt-1 font-serif text-xl leading-snug">
                      {card.title}
                    </h2>
                    <LocalizedClientLink
                      href={`/products/${card.handle}`}
                      className="mt-2 inline-block text-sm text-ivory underline underline-offset-4 hover:text-gold"
                    >
                      See Details
                    </LocalizedClientLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TrustBar />
    </>
  )
}

export const TrustBar = () => (
  <div className="w-full border-y border-gold/30 bg-ivory text-ink">
    <ul className="content-container grid grid-cols-1 small:grid-cols-3 gap-y-4 gap-x-6 py-6 text-center">
      {TRUST_BAR.map((item) => (
        <li key={item.title} className="flex flex-col items-center gap-1">
          <span className="font-serif text-lg text-berry">{item.title}</span>
          <span className="text-sm text-ink/70">{item.subtitle}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default Hero
