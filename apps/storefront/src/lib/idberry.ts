/**
 * IDBERRY Beauty brand content shared by the homepage, nav, footer and
 * WhatsApp button. Edit copy here rather than in components.
 *
 * Copy rule: never use "whitening" / "shades lighter" language — speak of
 * radiance, glow, brightening and even tone.
 */

export const BRAND = {
  name: "IDBERRY Beauty",
  tagline: "We provide all you need for your glowing skin.",
  description:
    "Radiance rituals for even tone, clear complexions and a glow that feels like you.",
  phoneDisplay: "+234 703 328 7766",
  phoneHref: "tel:+2347033287766",
  whatsappNumber: "2347033287766",
  email: "info@idberrybeauty.com",
  address: "2 Prince Durotoye Street, beside Vitafoam, Iju Road, Agege 100216",
  hours: "Mon–Fri 9–7, Sat 10–6",
  instagramHandle: "@idberry_beauty_products",
  instagramUrl: "https://www.instagram.com/idberry_beauty_products/",
} as const

export const whatsappLink = (message?: string) =>
  `https://wa.me/${BRAND.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`

export const HERO = {
  title: "Radiance, made for you.",
  subtitle: "Luxury skincare for skin that glows on its own terms.",
  primaryCta: { label: "Shop the Collection", href: "/store" },
  secondaryCta: { label: "Find Your Ritual", href: "#shop-by-concern" },
  video: "/videos/idberry-hero.mp4",
  poster: "/videos/idberry-hero-poster.jpg",
}

/** Real catalogue products shown on the hero cards. Titles, handles and images match the backend seed. Cards show title and See Details only, no description. */
export const HERO_CARDS = [
  {
    title: "Half Cast Golden Glow Facial Package",
    handle: "half-cast-golden-glow-facial-package",
    collection: "Half Cast",
    image: "/images/products/half-cast-golden-glow-facial-package.webp",
  },
  {
    title: "Snow White Plus Radiance Facial Cream 100g",
    handle: "snow-white-plus-radiance-facial-cream-100g",
    collection: "Snow White",
    image: "/images/products/snow-white-plus-radiance-facial-cream-100g.webp",
  },
  {
    title: "Caramel Glow Luxury Package",
    handle: "caramel-glow-luxury-package",
    collection: "Caramel Glow",
    image: "/images/products/caramel-glow-luxury-package.webp",
  },
]

export const TRUST_BAR = [
  "Nationwide & international delivery",
  "Secure checkout",
  "7-day replacement warranty",
  "WhatsApp skin consultation",
]

/** Handles match the backend seed (apps/backend/src/scripts/seed-idberry.ts). */
export const COLLECTIONS = [
  {
    title: "Snow White",
    handle: "snow-white",
    image: "/images/products/snow-white-radiance-full-set-plus-lurlu-hitam-scrub.webp",
  },
  {
    title: "Half Cast",
    handle: "half-cast",
    image: "/images/products/half-cast-golden-glow-facial-package.webp",
  },
  {
    title: "Caramel Glow",
    handle: "caramel-glow",
    image: "/images/products/caramel-glow-student-package.webp",
  },
  {
    title: "Royal Customized",
    handle: "royal-customized",
    image: "/images/products/royal-customized-radiance-super-luxury-set.webp",
  },
  {
    title: "Targeted Care",
    handle: "targeted-care",
    blurb:
      "Focused treatments for scars, stretch marks, spots, breakouts and dark knuckles.",
    image: "/images/products/scar-care-set.webp",
  },
  {
    title: "Little Ones",
    handle: "little-ones",
    image: "/images/products/flawless-brightening-kids-set.webp",
  },
]

/** Handles match the concern categories in the backend seed. */
export const CONCERNS = [
  { name: "Glow & Even Tone", handle: "glow-and-even-tone", note: "Radiance rituals" },
  { name: "Dark Spots & Breakouts", handle: "dark-spots-and-breakouts", note: "Clarify & calm" },
  { name: "Scars & Stretch Marks", handle: "scars-and-stretch-marks", note: "Smooth & renew" },
  { name: "Knees & Knuckles", handle: "knees-and-knuckles", note: "Even out dark areas" },
  { name: "Kids", handle: "kids", note: "Gentle for little ones" },
]

export const STORY = {
  eyebrow: "Our Story",
  title: "IDBERRY began with a voice.",
  body: [
    "Before the films and the formulas, Idunnunmi Esan was a hip-hop singer whose studio crew said she sounded \u201csweet like berry.\u201d She added ID, her nickname, and a name was born.",
    "Today the actress, filmmaker and cosmetologist pours that same sweetness into skincare: rituals for even tone, clear complexions and a glow that feels like you. From our studio to doorsteps worldwide, IDBERRY is for the woman who builds her own empire, and wants her skin to look the part.",
  ],
  mission:
    "To help every woman feel confident in her skin through effective, results-driven rituals and honest guidance.",
}

export const PILLARS = [
  "Results you can see",
  "Rituals, not random products",
  "Made for melanin-rich skin",
  "Guidance from a cosmetologist",
]

export const FOUNDER_QUOTE = {
  quote:
    "True beauty begins within. When a woman feels confident, it radiates through her skin, her smile and her energy.",
  attribution: "Idunnunmi \u201cIDBERRY\u201d Esan",
  role: "Founder & CEO",
}

export const WHOLESALE = {
  title: "Build your own beauty brand with IDBERRY.",
  body: "Wholesale pricing and private-label production available.",
  cta: "Chat on WhatsApp",
  message: "Hello IDBERRY, I'm interested in wholesale / private label.",
}

export const CONSULTATION = {
  title: "Not sure where to start?",
  body: "Tell us about your skin and we'll build your ritual.",
  cta: "WhatsApp us",
  message: "Hello IDBERRY, I'd like a skin consultation.",
}

// TODO(client): confirm answers to the first three FAQs (results timeline,
// tone matching, shipping zones/rates) before launch.
export const FAQ = [
  {
    q: "How soon will I see results?",
    a: "Most clients notice a softer, more radiant finish within the first weeks of consistent use. Results vary with skin type and how closely the ritual is followed, so message us on WhatsApp for guidance on your routine.",
  },
  {
    q: "Which ritual is right for my tone?",
    a: "Snow White is our signature radiance ritual, Half Cast gives a warm golden glow, and Caramel Glow keeps deep, rich tones rich while adding luminosity. Not sure? Send us a WhatsApp message for a free skin consultation.",
  },
  {
    q: "Do you ship outside Nigeria?",
    a: "Yes. We deliver nationwide across Nigeria and ship internationally. Delivery options and rates are shown at checkout.",
  },
  {
    q: "Can I return a product?",
    a: "We offer a 7-day replacement warranty. Contact us within 48 hours if you receive a wrong or defective item. Items must be unopened and in their original packaging.",
  },
  {
    q: "Do you offer wholesale?",
    a: "Yes. We offer wholesale pricing and private-label production for entrepreneurs building their own beauty brand. Chat with us on WhatsApp to get started.",
  },
]

/** Structured address / hours used for JSON-LD (LocalBusiness) and llms.txt. Keep NAP identical everywhere. */
export const BUSINESS = {
  legalName: "IDBERRY Beauty Product and Services",
  streetAddress: "2 Prince Durotoye Street, beside Vitafoam, Iju Road",
  addressLocality: "Agege",
  postalCode: "100216",
  addressCountry: "NG",
  telephone: "+2347033287766",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { days: ["Saturday"], opens: "10:00", closes: "18:00" },
  ],
  openingHoursText: ["Mo-Fr 09:00-19:00", "Sa 10:00-18:00"],
} as const

export const FOUNDER = {
  slug: "idunnunmi-esan",
  name: "Idunnunmi Esan",
  displayName: "Idunnunmi \u201cIDBERRY\u201d Esan",
  alternateName: "IDBERRY",
  jobTitle: "Founder & CEO, IDBERRY Beauty",
  shortBio:
    "Idunnunmi \u201cIDBERRY\u201d Esan is the founder and CEO of IDBERRY Beauty. She is a Nollywood actress, a filmmaker with Idberry Movie Productions, and a cosmetologist who builds skincare rituals for melanin-rich skin.",
  knowsAbout: ["Skincare", "Cosmetology", "Melanin-rich skin", "Film production"],
  sameAs: ["https://www.instagram.com/idberry_beauty_products/"],
}

/** Journal authors, keyed by the `author` frontmatter value. */
export const AUTHORS: Record<string, typeof FOUNDER> = {
  [FOUNDER.slug]: FOUNDER,
}
