import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text, clx } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { BRAND, whatsappLink } from "@lib/idberry";

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ]);

  return (
    <footer className="bg-berry-dark text-ivory w-full">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 small:flex-row items-start justify-between py-20 gap-x-16">
          <div className="max-w-sm flex flex-col gap-4">
            <LocalizedClientLink
              href="/"
              className="font-serif text-3xl tracking-[0.25em] text-ivory uppercase"
            >
              IDBERRY
            </LocalizedClientLink>
            <p className="font-serif italic text-lg text-ivory/80">
              {BRAND.tagline}
            </p>
            <address className="not-italic text-sm text-ivory/70 flex flex-col gap-1">
              <span>{BRAND.address}</span>
              <a className="hover:text-gold" href={BRAND.phoneHref}>
                {BRAND.phoneDisplay}
              </a>
              <a className="hover:text-gold" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
            </address>
            <div className="flex gap-4 text-sm">
              <a
                className="text-gold hover:text-ivory"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram {BRAND.instagramHandle}
              </a>
              <a
                className="text-gold hover:text-ivory"
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-ivory">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category_id) {
                      return;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-ivory/70 txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-gold",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-gold"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-ivory">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-ivory/70 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-gold"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-ivory">
                Customer service
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-ivory/70 txt-small">
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/shipping"
                  >
                    Shipping information
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/returns"
                  >
                    Return policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/terms"
                  >
                    Terms of service
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/privacy"
                  >
                    Privacy policy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/contact"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="hover:text-gold"
                    href="/search"
                  >
                    Search
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-ivory">IDBERRY</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ivory/70 txt-small">
                <li>
                  <LocalizedClientLink className="hover:text-gold" href="/#our-story">
                    Our story
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-gold" href="/journal">
                    The Glow Journal
                  </LocalizedClientLink>
                </li>
                <li>
                  <a
                    className="hover:text-gold"
                    href={whatsappLink("Hello IDBERRY, I'm interested in wholesale / private label.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Wholesale &amp; private label
                  </a>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-gold" href="/#faq">
                    FAQ
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-4 mb-16 pt-6 border-t border-ivory/20 justify-between text-ivory/60">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-ivory/30 px-4 py-1.5 text-xs uppercase tracking-widest">
              Paystack
            </span>
            <span className="rounded-full border border-ivory/30 px-4 py-1.5 text-xs uppercase tracking-widest">
              Bank transfer
            </span>
          </div>
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} IDBERRY Beauty. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
