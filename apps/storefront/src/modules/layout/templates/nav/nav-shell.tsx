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
 * Navigation is the horizontal menu on the right. On screens below
 * the small breakpoint the horizontal links are hidden, so a hamburger
 * button in the left spacer opens a mobile-only dropdown panel. The
 * wordmark stays in the middle, kept centred by the left spacer and
 * the right flex container. The panel uses a solid opaque background
 * so page content never shows through it.
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
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  // Lock body scroll while the mobile menu is open, restoring the
  // previous value on close and on unmount.
  useEffect(() => {
    if (!menuOpen) {
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

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
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm small:hidden"
        />
      )}
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
          <div className="flex flex-1 basis-0 h-full items-center">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              data-testid="nav-menu-button"
              className="small:hidden flex flex-col items-center justify-center gap-[5px] h-10 w-10 -ml-2"
            >
              <span
                aria-hidden="true"
                className={`block h-[2px] w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[2px] w-6 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[2px] w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

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
      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full small:hidden bg-berry text-ivory shadow-lg"
        >
          <nav aria-label="Mobile navigation">
            <ul>
              <li className="border-b border-white/10">
                <LocalizedClientLink
                  href="/store"
                  onClick={closeMenu}
                  className="block px-6 py-4 text-base-regular hover:text-gold"
                >
                  Shop
                </LocalizedClientLink>
              </li>
              <li className="border-b border-white/10">
                <LocalizedClientLink
                  href="/collections/snow-white"
                  onClick={closeMenu}
                  className="block px-6 py-4 text-base-regular hover:text-gold"
                >
                  Collections
                </LocalizedClientLink>
              </li>
              <li className="border-b border-white/10">
                <LocalizedClientLink
                  href="/journal"
                  onClick={closeMenu}
                  className="block px-6 py-4 text-base-regular hover:text-gold"
                >
                  Journal
                </LocalizedClientLink>
              </li>
              <li className="border-b border-white/10">
                <LocalizedClientLink
                  href="/account"
                  onClick={closeMenu}
                  data-testid="nav-account-link"
                  className="block px-6 py-4 text-base-regular hover:text-gold"
                >
                  Account
                </LocalizedClientLink>
              </li>
            </ul>
            <div
              className="flex gap-3 px-6 py-4"
              aria-label="Choose region and currency"
            >
              <a
                href="/ng"
                onClick={closeMenu}
                aria-current={countryCode === "ng" ? "page" : undefined}
                className={`flex-1 text-center rounded-full border px-3 py-2 ${
                  countryCode === "ng"
                    ? "bg-ivory text-berry border-ivory"
                    : "border-white/25 hover:text-gold"
                }`}
              >
                NGN
              </a>
              <a
                href="/us"
                onClick={closeMenu}
                aria-current={countryCode === "us" ? "page" : undefined}
                className={`flex-1 text-center rounded-full border px-3 py-2 ${
                  countryCode === "us"
                    ? "bg-ivory text-berry border-ivory"
                    : "border-white/25 hover:text-gold"
                }`}
              >
                USD
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
