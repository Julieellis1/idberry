import "server-only"

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

/**
 * The Glow Journal — file-based blog.
 *
 * Posts live in `apps/storefront/content/journal/*.mdx` with YAML frontmatter
 * (see README-IDBERRY.md → "Blog & SEO"). This module is the only place that
 * reads them, so swapping to a headless CMS (Payload, Sanity…) later means
 * re-implementing these functions and nothing else.
 */

export const JOURNAL_NAME = "The Glow Journal"
export const JOURNAL_DESCRIPTION =
  "Skincare rituals, skin concerns and Lagos living for melanin-rich skin, from the IDBERRY Beauty studio in Lagos."
export const JOURNAL_PAGE_SIZE = 9

const CONTENT_DIR = path.join(process.cwd(), "content", "journal")

export type JournalFaq = { q: string; a: string }

export type JournalPostMeta = {
  title: string
  slug: string
  description: string
  date: string
  updated: string
  category: string
  categorySlug: string
  tags: string[]
  author: string
  image: string
  imageAlt: string
  keyTakeaways: string[]
  faq: JournalFaq[]
  relatedProducts: string[]
  readingMinutes: number
}

export type JournalPost = JournalPostMeta & {
  /** Raw MDX body (frontmatter stripped). */
  body: string
  headings: JournalHeading[]
}

export type JournalHeading = { id: string; text: string }

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

/** Strips inline markdown so headings and plain-text exports read cleanly. */
export const stripInlineMarkdown = (value: string) =>
  value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`([^`]+)`/g, "$1")
    .trim()

const asString = (value: unknown, fallback = "") =>
  value instanceof Date
    ? value.toISOString().slice(0, 10)
    : typeof value === "string"
    ? value
    : fallback

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((v) => String(v)) : []

const extractHeadings = (body: string): JournalHeading[] => {
  const headings: JournalHeading[] = []
  let inFence = false
  for (const line of body.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence
      continue
    }
    const match = !inFence && /^##\s+(.+?)\s*#*\s*$/.exec(line)
    if (match) {
      const text = stripInlineMarkdown(match[1])
      headings.push({ id: slugify(text), text })
    }
  }
  return headings
}

const parsePost = (fileName: string): JournalPost => {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8")
  const { data, content } = matter(raw)
  const fileSlug = fileName.replace(/\.mdx?$/, "")
  const date = asString(data.date)
  const category = asString(data.category, "Journal")
  const words = content.split(/\s+/).filter(Boolean).length

  return {
    title: asString(data.title, fileSlug),
    slug: asString(data.slug, fileSlug),
    description: asString(data.description),
    date,
    updated: asString(data.updated, date),
    category,
    categorySlug: slugify(category),
    tags: asStringArray(data.tags),
    author: asString(data.author, "idunnunmi-esan"),
    image: asString(data.image),
    imageAlt: asString(data.imageAlt, asString(data.title)),
    keyTakeaways: asStringArray(data.keyTakeaways),
    faq: Array.isArray(data.faq)
      ? data.faq
          .filter((f: unknown) => f && typeof f === "object")
          .map((f: Record<string, unknown>) => ({
            q: String(f.q ?? ""),
            a: String(f.a ?? ""),
          }))
          .filter((f: JournalFaq) => f.q && f.a)
      : [],
    relatedProducts: asStringArray(data.relatedProducts),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    body: content,
    headings: extractHeadings(content),
  }
}

let cache: JournalPost[] | null = null

/** All posts, newest first. Drafts (`draft: true`) and future-dated posts are excluded in production. */
export const getAllPosts = (): JournalPost[] => {
  if (cache && process.env.NODE_ENV === "production") {
    return cache
  }
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }
  const today = new Date().toISOString().slice(0, 10)
  const posts = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const post = parsePost(f)
      const raw = matter(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"))
      return { post, draft: raw.data.draft === true }
    })
    .filter(
      ({ post, draft }) =>
        process.env.NODE_ENV !== "production" ||
        (!draft && (!post.date || post.date <= today))
    )
    .map(({ post }) => post)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  cache = posts
  return posts
}

export const getPostMetas = (): JournalPostMeta[] =>
  getAllPosts().map(({ body: _body, headings: _headings, ...meta }) => meta)

export const getPostBySlug = (slug: string): JournalPost | undefined =>
  getAllPosts().find((p) => p.slug === slug)

export const getCategories = () => {
  const map = new Map<string, { name: string; slug: string; count: number }>()
  for (const post of getAllPosts()) {
    const entry = map.get(post.categorySlug)
    if (entry) {
      entry.count += 1
    } else {
      map.set(post.categorySlug, {
        name: post.category,
        slug: post.categorySlug,
        count: 1,
      })
    }
  }
  return Array.from(map.values())
}

export const getCategoryBySlug = (slug: string) =>
  getCategories().find((c) => c.slug === slug)

export const paginate = <T,>(items: T[], page: number, size = JOURNAL_PAGE_SIZE) => {
  const totalPages = Math.max(1, Math.ceil(items.length / size))
  const current = Math.min(Math.max(1, page), totalPages)
  return {
    items: items.slice((current - 1) * size, current * size),
    page: current,
    totalPages,
  }
}

/** Related posts: same category first, then shared tags, then newest. */
export const getRelatedPosts = (post: JournalPostMeta, limit = 3) =>
  getPostMetas()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (p.categorySlug === post.categorySlug ? 10 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post: p }) => p)

export const formatPostDate = (date: string) => {
  const d = new Date(`${date}T12:00:00Z`)
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Africa/Lagos",
      })
}

/** Plain-text version of a post body for llms-full.txt (markdown kept, JSX removed). */
export const toPlainMarkdown = (body: string) =>
  body
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

/**
 * Fallback names for related-product handles, used when the Medusa backend is
 * unreachable or a handle is missing so the "Shop the ritual" strip still renders.
 */
export const PRODUCT_NAME_FALLBACKS: Record<string, string> = {
  "snow-white-radiance-facial-set": "Snow White Radiance Facial Set",
  "7-day-smooth-and-clear-vitamin-c-facial-serum":
    "7-Day Smooth & Clear Vitamin C Facial Serum",
  "all-clear-facial-set": "All Clear Facial Set",
  "caramel-glow-luxury-package": "Caramel Glow Luxury Package",
  "snow-white-plus-radiance-oil": "Snow White Plus Radiance Oil",
  "pure-herbal-skinglow-black-soap": "Pure Herbal Skinglow Black Soap",
}

export const productNameFromHandle = (handle: string) =>
  PRODUCT_NAME_FALLBACKS[handle] ??
  handle
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
