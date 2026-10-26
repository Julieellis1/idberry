/**
 * Absolute site URL for statically generated files (RSS, llms-full.txt) that
 * have no request to read the host from. Set NEXT_PUBLIC_BASE_URL in production.
 */
export const PUBLIC_SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://idberrybeauty.com"
).replace(/\/$/, "")
