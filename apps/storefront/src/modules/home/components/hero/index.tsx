"use client"

import { useEffect, useRef, useState } from "react"

import { BRAND, HERO, HERO_CARDS, TRUST_BAR } from "@lib/idberry"
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
    // Slow motion playback. The clip itself is already gentle, this
    // halves its speed. Respect reduced motion by holding on the poster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause()
      return
    }
    video.playbackRate = 0.5
    const setRate = () => {
      video.playbackRate = 0.5
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
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full flex-col px-6 pb-8 pt-32 small:px-10 large:px-14">
          <div className="flex flex-1 items-center">
            <div className="grid w-full grid-cols-1 gap-8 large:grid-cols-12 large:items-start">
              <div className="large:col-span-7">
                <span className="uppercase tracking-[0.3em] text-xs text-gold">
                  IDBERRY Beauty · Lagos
                </span>
                <h1 className="mt-5 font-serif text-5xl leading-[1.02] small:text-7xl">
                  <span className="italic font-light">Radiance,</span>
                  <br />
                  made in Lagos.
                </h1>
                <p className="mt-5 max-w-md text-lg text-ivory/85">
                  {HERO.subtitle}
                </p>
                <div className="flex flex-col xsmall:flex-row gap-3 pt-7">
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
              <p className="max-w-xs text-sm leading-relaxed text-ivory/80 large:col-span-5 large:ml-auto large:text-right">
                {BRAND.description}
              </p>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 small:grid-cols-3">
            {HERO_CARDS.map((card) => (
              <li
                key={card.handle}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
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
                    <p className="mt-1 text-sm text-ivory/75">{card.blurb}</p>
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
