"use client"

import { useEffect, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import type { ReactNode } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

/**
 * Header shell for the main layout.
 *
 * On the homepage only, the header overlays the full-viewport hero video:
 * fixed, transparent, white text while the hero is on screen, then solid
 * ivory once the user scrolls past it. Every other page keeps the normal
 * sticky ivory header, so white text never lands on a light page.
 *
 * There is a single menu: the slide-in Menu on the right. The wordmark
 * sits on the left, and Search, Cart and Menu sit on the right.
 */
export default function NavShell({
  sideMenu,
  search,
  cart,
}: {
  sideMenu: ReactNode
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
        className={
          overlay
            ? "w-full bg-black/25 backdrop-blur-sm text-ivory text-[11px] small:text-xs tracking-widest uppercase text-center py-2"
            : "w-full bg-berry text-ivory text-[11px] small:text-xs tracking-widest uppercase text-center py-2"
        }
      >
        Nationwide &amp; international delivery · WhatsApp +234 703 328 7766
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
          <div className="flex-1 basis-0 h-full flex items-center">
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
            {cart}
            <div className="h-full">{sideMenu}</div>
          </div>
        </nav>
      </header>
    </div>
  )
}
