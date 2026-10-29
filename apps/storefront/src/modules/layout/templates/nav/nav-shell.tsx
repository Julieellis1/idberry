"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import type { ReactNode } from "react"

import { CONSULTATION, whatsappLink } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Header shell for the main layout.
 *
 * On the homepage only, the header overlays the full-viewport hero video:
 * fixed, transparent, white text while the hero is on screen, then solid
 * ivory once the user scrolls past it. Every other page keeps the normal
 * sticky ivory header, so white text never lands on a light page.
 *
 * Navigation is the horizontal menu on the right. There is no slide-in
 * menu: the wordmark sits in the middle, kept centred by an empty flex
 * spacer on the left, with Search, the horizontal links, and Cart on
 * the right.
 */
export default function NavShell({
  search,
  cart,
}: {
  search: ReactNode
  cart: ReactNode
}) {
  const pathname = usePathname()
  const params = useParams()
  const countryCode =
    typeof params?.countryCode === "string" ? params.countryCode : undefined
  const isHome =
    pathname === "/" || (countryCode ? pathname === `/${countryCode}` : false)

  const [pastHero, setPastHero] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const timer = window.setInterval(() => {
      setAnnouncementIndex((index) => (index + 1) % 2)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isHome) {
      return
    }
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight - 96)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  // Fixed on the homepage so the header overlays the hero without
  // changing layout when it turns solid after scrolling past the hero.
  // Sticky everywhere else, as before.
  const overlay = isHome && !pastHero

  return (
    <div
      className={
        isHome
          ? "fixed top-0 inset-x-0 z-50"
          : "sticky top-0 inset-x-0 z-50 group"
      }
    >
      <div
        aria-live="polite"
        className={
          overlay
            ? "w-full bg-black/25 backdrop-blur-sm text-ivory text-[11px] small:text-xs tracking-widest uppercase text-center py-2"
            : "w-full bg-berry text-ivory text-[11px] small:text-xs tracking-widest uppercase text-center py-2"
        }
      >
        {announcementIndex === 0 ? (
          <span>Nationwide &amp; international delivery</span>
        ) : (
          <a
            href={whatsappLink(CONSULTATION.message)}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-gold"
          >
            Free WhatsApp skin consultation
          </a>
        )}
      </div>
      <header
        className={
          overlay
            ? "relative h-16 mx-auto border-b duration-200 bg-black/15 backdrop-blur-sm border-white/20"
            : "relative h-16 mx-auto border-b duration-200 bg-ivory border-blush"
        }
      >
        <nav
          className={`content-container txt-xsmall-plus flex items-center justify-between w-full h-full text-small-regular ${
            overlay ? "text-ivory" : "text-ui-fg-subtle"
          }`}
        >
          <div className="flex-1 basis-0 h-full" aria-hidden="true" />

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className={`font-serif text-2xl small:text-3xl tracking-[0.25em] uppercase ${
                overlay
                  ? "text-ivory hover:text-gold"
                  : "text-berry hover:text-berry-dark"
              }`}
              data-testid="nav-store-link"
            >
              IDBERRY
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {search}
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className={overlay ? "hover:text-gold" : "hover:text-berry"}
                href="/store"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                className={overlay ? "hover:text-gold" : "hover:text-berry"}
                href="/collections/snow-white"
              >
                Collections
              </LocalizedClientLink>
              <LocalizedClientLink
                className={overlay ? "hover:text-gold" : "hover:text-berry"}
                href="/journal"
              >
                Journal
              </LocalizedClientLink>
              <LocalizedClientLink
                className={
                  overlay ? "hover:text-gold" : "hover:text-ui-fg-base"
                }
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <div
              className="hidden xsmall:flex items-center rounded-full border p-1 gap-1"
              aria-label="Choose region and currency"
            >
              <a
                href="/ng"
                aria-current={countryCode === "ng" ? "page" : undefined}
                className={`rounded-full px-3 py-1 ${
                  countryCode === "ng"
                    ? overlay
                      ? "bg-ivory text-ink"
                      : "bg-berry text-ivory"
                    : overlay
                      ? "text-ivory hover:text-gold"
                      : "text-ui-fg-subtle hover:text-berry"
                }`}
              >
                NGN
              </a>
              <a
                href="/us"
                aria-current={countryCode === "us" ? "page" : undefined}
                className={`rounded-full px-3 py-1 ${
                  countryCode === "us"
                    ? overlay
                      ? "bg-ivory text-ink"
                      : "bg-berry text-ivory"
                    : overlay
                      ? "text-ivory hover:text-gold"
                      : "text-ui-fg-subtle hover:text-berry"
                }`}
              >
                USD
              </a>
            </div>
            {cart}
          </div>
        </nav>
      </header>
    </div>
  )
}
