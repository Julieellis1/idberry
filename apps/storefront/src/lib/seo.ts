import "server-only"

import { Metadata } from "next"
import { BRAND, BUSINESS, COLLECTIONS, FOUNDER } from "@lib/idberry"
import { DEFAULT_COUNTRY_CODE, getSiteOrigin, STORE_NAME } from "@lib/util/site"

/** Fallback social image until the client supplies a branded OG image. */
export const DEFAULT_OG_IMAGE = COLLECTIONS[0].image

/**
 * Builds consistent page metadata: description, canonical, Open Graph and
 * Twitter. `title` is passed through the root template "%s | IDBERRY Beauty".
 *
 * `path` is the path after the country code ("/journal/foo"). When
 * `canonicalCountry` is set the canonical points at that country's copy
 * (used for content that is identical in every region, like the Journal).
 */
export async function buildPageMetadata({
  title,
  description,
  countryCode,
  path = "",
  canonicalCountry,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex,
}: {
  title: string
  description: string
  countryCode: string
  path?: string
  canonicalCountry?: string
  image?: string | null
  imageAlt?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}): Promise<Metadata> {
  const origin = await getSiteOrigin()
  const url = `${origin}/${canonicalCountry ?? countryCode}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE
  const fullTitle = `${title} | ${STORE_NAME}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: STORE_NAME,
      locale: "en_NG",
      type,
      images: [{ url: ogImage, alt: imageAlt ?? title }],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors, tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  }
}

export const journalCanonicalCountry = DEFAULT_COUNTRY_CODE

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                     */
/* ------------------------------------------------------------------ */

export const ids = (origin: string) => ({
  organization: `${origin}/#organization`,
  business: `${origin}/#store`,
  website: `${origin}/#website`,
  founder: `${origin}/#founder`,
})

const postalAddress = () => ({
  "@type": "PostalAddress",
  streetAddress: BUSINESS.streetAddress,
  addressLocality: BUSINESS.addressLocality,
  addressRegion: BUSINESS.addressRegion,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.addressCountry,
})

export const organizationJsonLd = (origin: string, extra: Record<string, unknown> = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ids(origin).organization,
  name: STORE_NAME,
  legalName: BUSINESS.legalName,
  url: origin,
  logo: DEFAULT_OG_IMAGE,
  description: BRAND.description,
  email: BRAND.email,
  telephone: BUSINESS.telephone,
  address: postalAddress(),
  founder: { "@id": ids(origin).founder },
  sameAs: [BRAND.instagramUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: BUSINESS.telephone,
    email: BRAND.email,
    areaServed: ["NG", "Worldwide"],
    availableLanguage: ["English"],
  },
  ...extra,
})

export const localBusinessJsonLd = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": ids(origin).business,
  name: STORE_NAME,
  url: origin,
  image: DEFAULT_OG_IMAGE,
  telephone: BUSINESS.telephone,
  email: BRAND.email,
  priceRange: "$$",
  address: postalAddress(),
  openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  parentOrganization: { "@id": ids(origin).organization },
  sameAs: [BRAND.instagramUrl],
})

export const websiteJsonLd = (origin: string, countryCode: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": ids(origin).website,
  name: STORE_NAME,
  url: origin,
  publisher: { "@id": ids(origin).organization },
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${origin}/${countryCode}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
})

export const founderJsonLd = (origin: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": ids(origin).founder,
  name: FOUNDER.name,
  alternateName: FOUNDER.alternateName,
  jobTitle: FOUNDER.jobTitle,
  description: FOUNDER.shortBio,
  knowsAbout: FOUNDER.knowsAbout,
  worksFor: { "@id": ids(origin).organization },
  sameAs: FOUNDER.sameAs,
})

export const breadcrumbJsonLd = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
})

export const faqJsonLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
})
