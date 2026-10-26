import { AUTHORS, BRAND, FOUNDER } from "@lib/idberry"
import { getPostMetas, JOURNAL_DESCRIPTION, JOURNAL_NAME } from "@lib/journal"
import { PUBLIC_SITE_URL } from "@lib/util/public-site"
import { DEFAULT_COUNTRY_CODE } from "@lib/util/site"

export const dynamic = "force-static"
export const revalidate = 3600

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

const rfc822 = (date: string) => new Date(`${date}T08:00:00+01:00`).toUTCString()

export async function GET() {
  const posts = getPostMetas()
  const journalUrl = `${PUBLIC_SITE_URL}/${DEFAULT_COUNTRY_CODE}/journal`
  const feedUrl = `${PUBLIC_SITE_URL}/journal/rss.xml`

  const items = posts
    .map((post) => {
      const url = `${journalUrl}/${post.slug}`
      const author = AUTHORS[post.author] ?? FOUNDER
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <dc:creator>${esc(author.name)}</dc:creator>
      <category>${esc(post.category)}</category>${
        post.image
          ? `\n      <enclosure url="${esc(post.image)}" type="${
              post.image.endsWith(".png") ? "image/png" : "image/jpeg"
            }" length="0" />`
          : ""
      }
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`${JOURNAL_NAME} | ${BRAND.name}`)}</title>
    <link>${journalUrl}</link>
    <description>${esc(JOURNAL_DESCRIPTION)}</description>
    <language>en-ng</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${posts[0] ? rfc822(posts[0].updated || posts[0].date) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
