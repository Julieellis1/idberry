import { clx } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CategoryFilter({
  categories,
  active,
}: {
  categories: { name: string; slug: string; count: number }[]
  active?: string
}) {
  const pill = (isActive: boolean) =>
    clx(
      "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors",
      isActive
        ? "border-berry bg-berry text-ivory"
        : "border-blush text-berry hover:border-gold"
    )

  return (
    <nav aria-label="Journal categories">
      <ul className="flex flex-wrap gap-3">
        <li>
          <LocalizedClientLink
            href="/journal"
            className={pill(!active)}
            aria-current={!active ? "page" : undefined}
          >
            All
          </LocalizedClientLink>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <LocalizedClientLink
              href={`/journal/category/${c.slug}`}
              className={pill(active === c.slug)}
              aria-current={active === c.slug ? "page" : undefined}
            >
              {c.name} <span className="opacity-60">({c.count})</span>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
