import { toJsonLd } from "@lib/util/product-structured-data"

/** Renders one or more schema.org objects as a JSON-LD script tag. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(data) }}
    />
  )
}
