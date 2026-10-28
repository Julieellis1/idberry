"use client"

import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment, useEffect } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"


const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Journal: "/journal",
  Account: "/account",
  Cart: "/cart",
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

type MenuInnerProps = SideMenuProps & {
  open: boolean
  close: () => void
}

/**
 * The slide-in menu, rendered by the Popover render prop so the open state
 * is available to a real component (for the body scroll lock). The panel
 * slides in from the right edge, is fully opaque, and sits over a dark
 * blurred overlay that covers and blurs the page behind it.
 */
const MenuInner = ({ open, close, regions, locales, currentLocale }: MenuInnerProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  // Lock body scroll while the menu is open, restore it on close/unmount.
  useEffect(() => {
    if (!open) {
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <>
      <div className="relative flex h-full">
        <PopoverButton
          data-testid="nav-menu-button"
          className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
        >
          Menu
        </PopoverButton>
      </div>

      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={close}
            data-testid="side-menu-backdrop"
          />
          <PopoverPanel
            static
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-berry-dark text-ivory shadow-2xl animate-fade-in-right"
          >
            <div
              data-testid="nav-menu-popup"
              className="flex flex-col h-full justify-between p-6"
            >
              <div className="flex justify-end" id="xmark">
                <button
                  data-testid="close-menu-button"
                  onClick={close}
                  aria-label="Close menu"
                  className="text-ivory hover:text-gold"
                >
                  <XMark />
                </button>
              </div>
              <ul className="flex flex-col gap-6 items-start justify-start">
                {Object.entries(SideMenuItems).map(([name, href]) => {
                  return (
                    <li key={name}>
                      <LocalizedClientLink
                        href={href}
                        className="text-3xl leading-10 text-ivory hover:text-gold"
                        onClick={close}
                        data-testid={`${name.toLowerCase()}-link`}
                      >
                        {name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
              <div className="flex flex-col gap-y-6 text-ivory">
                {!!locales?.length && (
                  <div
                    className="flex justify-between"
                    onMouseEnter={languageToggleState.open}
                    onMouseLeave={languageToggleState.close}
                  >
                    <LanguageSelect
                      toggleState={languageToggleState}
                      locales={locales}
                      currentLocale={currentLocale}
                    />
                    <ArrowRightMini
                      className={clx(
                        "transition-transform duration-150",
                        languageToggleState.state ? "-rotate-90" : ""
                      )}
                    />
                  </div>
                )}
                <div
                  className="flex justify-between"
                  onMouseEnter={countryToggleState.open}
                  onMouseLeave={countryToggleState.close}
                >
                  {regions && (
                    <CountrySelect
                      toggleState={countryToggleState}
                      regions={regions}
                    />
                  )}
                  <ArrowRightMini
                    className={clx(
                      "transition-transform duration-150",
                      countryToggleState.state ? "-rotate-90" : ""
                    )}
                  />
                </div>
                <Text className="flex justify-between txt-compact-small text-ivory/80">
                  © {new Date().getFullYear()} IDBERRY Beauty. All rights
                  reserved.
                </Text>
              </div>
            </div>
          </PopoverPanel>
        </div>
      </Transition>
    </>
  )
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <MenuInner
              open={open}
              close={close}
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
