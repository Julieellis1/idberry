import { BRAND, COLLECTIONS } from "@lib/idberry"
import Image from "next/image"

/** Six tiles from existing collection images only. No captions, no counts, no customer faces. */
export default function SocialStrip() {
  return (
    <section className="py-20" aria-labelledby="social-strip-heading">
      <div className="content-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs text-berry">
              #IDBERRYGLOW
            </span>
            <h2
              id="social-strip-heading"
              className="font-serif text-4xl small:text-5xl text-ink mt-3"
            >
              As seen on <span className="italic text-berry">you.</span>
            </h2>
          </div>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm uppercase tracking-[0.2em] text-berry underline underline-offset-4 hover:text-gold"
          >
            Follow {BRAND.instagramHandle}
          </a>
        </div>
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-6 gap-4">
          {COLLECTIONS.map((c) => (
            <li key={c.handle}>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`IDBERRY ${c.title} on Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-[24px] bg-blush/40"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
