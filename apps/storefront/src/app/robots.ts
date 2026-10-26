import { getSiteOrigin } from "@lib/util/site"
import type { MetadataRoute } from "next"

const PRIVATE_PATHS = [
  "/*/cart",
  "/*/checkout",
  "/*/account",
  "/*/order/",
  "/buy/",
  "/api/",
]

/**
 * AI crawlers are explicitly welcome (GEO): answer engines can only cite
 * IDBERRY if they are allowed to read it. Remove a bot here to opt out.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
]

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await getSiteOrigin()

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  }
}
