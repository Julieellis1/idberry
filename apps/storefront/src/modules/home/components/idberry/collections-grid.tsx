import { COLLECTIONS } from "@lib/idberry"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export default function CollectionsGrid() {
  return (
    <section className="content-container py-20" id="collections">
      <div className="text-center mb-12">
        <span className="uppercase tracking-[0.3em] text-xs text-gold">
          The Rituals
        </span>
        <h2 className="font-serif text-4xl small:text-5xl text-berry mt-3">
          Shop by collection
        </h2>
      </div>
      <ul className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 gap-6">
        {COLLECTIONS.map((c) => (
          <li key={c.handle}>
            <LocalizedClientLink
              href={`/collections/${c.handle}`}
              className="group block h-full rounded-2xl bg-white/70 border border-blush overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square bg-blush/40 overflow-hidden">
                <Image
                  src={c.image}
                  alt={`IDBERRY ${c.title} collection`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 512px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-berry">{c.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{c.blurb}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest text-gold group-hover:text-berry">
                  Explore →
                </span>
              </div>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
