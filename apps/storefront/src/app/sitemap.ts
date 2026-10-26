import { sdk } from "@lib/config"
import { listRegions } from "@lib/data/regions"
import { getCategories, getPostMetas } from "@lib/journal"
import {
  DEFAULT_COUNTRY_CODE,
  getSiteOrigin,
  listCountryCodes,
} from "@lib/util/site"
import type { MetadataRoute } from "next"

const STATIC_PATHS = [
  "",
  "/store",
  "/shipping",
  "/returns",
  "/terms",
  "/privacy",
  "/contact",
]
const PAGE_SIZE = 200

type Page<T> = { items: T[]; count: number }

async function listAll<T>(fetchPage: (offset: number) => Promise<Page<T>>) {
  const all: T[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const { items, count } = await fetchPage(offset)
    all.push(...items)
    if (offset + PAGE_SIZE >= count || !items.length) {
      return all
    }
  }
}

/** Never let a backend hiccup take the whole sitemap (and the Journal URLs) down. */
const safe = <T>(promise: Promise<T[]>) => promise.catch(() => [] as T[])

type Entry = { handle?: string | null; updated_at?: string | Date | null }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const query = { fields: "handle,updated_at", limit: PAGE_SIZE }

  const [origin, regions, products, categories, collections] =
    await Promise.all([
      getSiteOrigin(),
      safe(listRegions()),
      safe(
        listAll<Entry>((offset) =>
          sdk.store.product
            .list({ ...query, offset })
            .then((res) => ({ items: res.products, count: res.count }))
        )
      ),
      safe(
        listAll<Entry>((offset) =>
          sdk.store.category
            .list({ ...query, offset })
            .then((res) => ({ items: res.product_categories, count: res.count }))
        )
      ),
      safe(
        listAll<Entry>((offset) =>
          sdk.store.collection
            .list({ ...query, offset })
            .then((res) => ({ items: res.collections, count: res.count }))
        )
      ),
    ])

  const toEntries = (base: string, prefix: string, items: Entry[]) =>
    items
      .filter((item) => item.handle)
      .map((item) => ({
        url: `${base}/${prefix}/${item.handle}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at).toISOString()
          : undefined,
      }))

  const countryCodes = listCountryCodes(regions)
  const shopEntries = (countryCodes.length ? countryCodes : [DEFAULT_COUNTRY_CODE]).flatMap(
    (countryCode) => {
      const base = `${origin}/${countryCode}`
      return [
        ...STATIC_PATHS.map((path) => ({ url: `${base}${path}` })),
        ...toEntries(base, "products", products),
        ...toEntries(base, "categories", categories),
        ...toEntries(base, "collections", collections),
      ]
    }
  )

  // The Journal is identical in every region, so only the canonical
  // (default-country) URLs are listed — matching each page's rel=canonical.
  const journalBase = `${origin}/${DEFAULT_COUNTRY_CODE}/journal`
  const posts = getPostMetas()
  const latest = posts[0]?.updated ?? posts[0]?.date
  const journalEntries: MetadataRoute.Sitemap = [
    {
      url: journalBase,
      lastModified: latest || undefined,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...getCategories().map((c) => ({
      url: `${journalBase}/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${journalBase}/${p.slug}`,
      lastModified: p.updated || p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(p.image ? { images: [p.image] } : {}),
    })),
  ]

  return [...shopEntries, ...journalEntries]
}
