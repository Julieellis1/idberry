import { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import NavShell from "./nav-shell"

export default function Nav() {
  return (
    <NavShell
      search={<Search />}
      cart={
        <Suspense
          fallback={
            <LocalizedClientLink
              className="hover:text-ui-fg-base flex gap-2"
              href="/cart"
              data-testid="nav-cart-link"
            >
              Cart (0)
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      }
    />
  )
}
