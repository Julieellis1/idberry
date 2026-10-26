import { AUTHORS, BRAND, FOUNDER, STORY } from "@lib/idberry"
import {
  getAllPosts,
  JOURNAL_DESCRIPTION,
  JOURNAL_NAME,
  toPlainMarkdown,
} from "@lib/journal"
import { PUBLIC_SITE_URL } from "@lib/util/public-site"
import { DEFAULT_COUNTRY_CODE } from "@lib/util/site"

export const dynamic = "force-static"
export const revalidate = 3600

/**
 * /llms-full.txt — every Glow Journal article in full, as Markdown, for
 * answer engines (GEO). The short brand overview is the static public/llms.txt.
 */
export async function GET() {
  const posts = getAllPosts()
  const journalUrl = `${PUBLIC_SITE_URL}/${DEFAULT_COUNTRY_CODE}/journal`

  const sections = posts.map((post) => {
    const author = AUTHORS[post.author] ?? FOUNDER
    const takeaways = post.keyTakeaways.map((t) => `- ${t}`).join("\n")
    const faq = post.faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")
    return `## ${post.title}

- URL: ${journalUrl}/${post.slug}
- Category: ${post.category}
- Author: ${author.name} (${author.jobTitle})
- Published: ${post.date}${post.updated && post.updated !== post.date ? ` · Updated: ${post.updated}` : ""}
- Summary: ${post.description}

**Key takeaways**

${takeaways}

${toPlainMarkdown(post.body).replace(/^## /gm, "### ")}

**FAQ**

${faq}
`
  })

  const body = `# ${BRAND.name} — ${JOURNAL_NAME} (full text)

> ${BRAND.description}

${JOURNAL_DESCRIPTION} Brand overview: ${PUBLIC_SITE_URL}/llms.txt

About the brand: ${STORY.body[0]}

Editorial standards: articles are general skincare guidance, not medical advice. IDBERRY recommends daily broad-spectrum sunscreen, patch testing new products, and seeing a dermatologist for persistent concerns. IDBERRY speaks of radiance, glow, brightening and even tone; it does not promote changing a person's natural complexion.

Contact: ${BRAND.address} · ${BRAND.phoneDisplay} (call/WhatsApp) · ${BRAND.email}

---

${sections.join("\n---\n\n")}`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
