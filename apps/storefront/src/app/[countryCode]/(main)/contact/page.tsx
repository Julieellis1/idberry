import { Metadata } from "next"
import { buildPageMetadata } from "@lib/seo"

import { STORE_NAME } from "@lib/util/site"
import { PlaceholderNotice, PolicyPage } from "@modules/policies/templates"

export const dynamic = "force-static"
export const revalidate = 60

export async function generateMetadata(props: {
  params: Promise<{ countryCode: string }>
}): Promise<Metadata> {
  const { countryCode } = await props.params
  return buildPageMetadata({
    title: "Contact",
    description: `Contact ${STORE_NAME}: 2 Prince Durotoye Street, beside Vitafoam, Iju Road, Agege, Lagos. Call or WhatsApp +234 703 328 7766, email info@idberrybeauty.com. Open Mon–Fri 9–7, Sat 10–6.`,
    countryCode,
    path: "/contact",
  })
}

export default function ContactPage() {
  return (
    <PolicyPage title="Contact">
      <PlaceholderNotice />
      <p>
        Questions about an order, shipping or returns? Contact {STORE_NAME}{" "}
        customer service and include your order number.
      </p>
    </PolicyPage>
  )
}
