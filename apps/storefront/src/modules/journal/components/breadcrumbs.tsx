import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type Crumb = { name: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink/60">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.name}-${i}`} className="flex items-center gap-2">
            {item.href ? (
              <LocalizedClientLink href={item.href} className="hover:text-berry">
                {item.name}
              </LocalizedClientLink>
            ) : (
              <span aria-current="page" className="text-ink/80 line-clamp-1">
                {item.name}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden className="text-gold">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
