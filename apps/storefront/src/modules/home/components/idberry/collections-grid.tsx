import { COLLECTIONS } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function CollectionsGrid() {
  return (
    <section className="py-20" id="collections">
      <div className="content-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs text-berry">
              Shop by Ritual
            </span>
            <h2 className="font-serif text-4xl small:text-5xl text-ink mt-3">
              Six rituals, <span className="italic text-berry">one glow</span>{" "}
              that is all yours.
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-sm uppercase tracking-[0.2em] text-berry underline underline-offset-4 hover:text-gold"
          >
            View all collections
          </LocalizedClientLink>
        </div>
        <ul className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 gap-6">
          {COLLECTIONS.map((c) => (
            <li key={c.handle}>
              <LocalizedClientLink
                href={`/collections/${c.handle}`}
                className="group block h-full overflow-hidden rounded-[28px] border border-blush bg-blush/40 hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={`IDBERRY ${c.title} collection`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 512px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-ink">
                    {c.title}{" "}
                    <span aria-hidden className="text-berry">
                      →
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {c.blurb}
                  </p>
                </div>
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
