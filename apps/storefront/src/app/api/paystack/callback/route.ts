import { sdk } from "@lib/config"
import { placeOrder } from "@lib/data/cart"
import { getAuthHeaders, getCartId, setCartId } from "@lib/data/cookies"
import { HttpTypes } from "@medusajs/types"
import { unstable_rethrow } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

/**
 * Paystack redirect callback (medusa-paystack).
 *
 * Set this URL as the "Callback URL" in Paystack Dashboard → Settings →
 * API Keys & Webhooks:   https://<your-storefront>/api/paystack/callback
 *
 * Paystack appends `?trxref=<ref>&reference=<ref>`. We find the cart (from
 * `cart_id` if present, otherwise the cart cookie), check the reference belongs
 * to that cart's Paystack session, then complete the cart. Completing the cart
 * runs the provider's authorizePayment, which verifies the transaction status,
 * amount and currency with Paystack server-side — the redirect alone is never
 * treated as proof of payment.
 */
export async function GET(req: NextRequest) {
  const { origin, searchParams } = req.nextUrl

  const reference = searchParams.get("reference") ?? searchParams.get("trxref")
  const countryCode = searchParams.get("country_code")
  const cartId = searchParams.get("cart_id") ?? (await getCartId())

  const prefix = countryCode ? `/${countryCode}` : ""
  const rejected = (reason = "payment_failed") =>
    NextResponse.redirect(`${origin}${prefix}/cart?error=${reason}`)

  if (!cartId || !reference) {
    return rejected()
  }

  const cart = await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${cartId}`, {
      method: "GET",
      query: {
        fields:
          "id,shipping_address.country_code,payment_collection.payment_sessions.*",
      },
      headers: { ...(await getAuthHeaders()) },
      cache: "no-store",
    })
    .then(({ cart }) => cart)
    .catch(() => null)

  const session = cart?.payment_collection?.payment_sessions?.find(
    (s) =>
      s.provider_id?.startsWith("pp_paystack") &&
      (s.data as Record<string, unknown> | undefined)?.reference === reference
  )

  if (!cart || !session) {
    return rejected()
  }

  await setCartId(cartId)

  try {
    // Redirects to /<country>/order/<id>/confirmed on success.
    await placeOrder(cartId)
  } catch (error) {
    unstable_rethrow(error)
    const cc = countryCode ?? cart.shipping_address?.country_code?.toLowerCase()
    return NextResponse.redirect(
      `${origin}${cc ? `/${cc}` : ""}/checkout?step=payment&error=paystack_verification_failed`
    )
  }

  return rejected("order_failed")
}
