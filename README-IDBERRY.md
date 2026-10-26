# IDBERRY Beauty — Medusa store

Custom headless store for **IDBERRY Beauty** (Lagos luxury skincare, founder Idunnunmi "IDBERRY" Esan), built on the
[Medusa DTC Starter](https://github.com/medusajs/dtc-starter):

- `apps/backend` — Medusa **2.22.1** commerce server + admin dashboard (Postgres, Redis)
- `apps/storefront` — Next.js 16 storefront, rebranded for IDBERRY

> Copy rule for everyone editing this store: never use "whitening" or "shades lighter" language. Use radiance, glow,
> brightening and even tone. Payment processors, ad platforms and NAFDAC all penalise bleaching claims.

---

## 1. What was changed from the starter

### Backend (`apps/backend`)
| File | Change |
|---|---|
| `package.json` | Added `medusa-paystack@0.2.0`; added script `seed:idberry`. |
| `medusa-config.ts` | Registered the Paystack payment provider (`medusa-paystack/providers/paystack`, id `paystack` → provider id `pp_paystack_paystack`), options `secret_key: PAYSTACK_SECRET_KEY`, `reference_prefix: IDB-`. Added `redisUrl`. |
| `src/data/idberry-catalogue.ts` | **New.** The 71-product catalogue (clean names, USD price, collection, concerns, type, image URL, legacy product URL, slug handle). |
| `src/scripts/seed-idberry.ts` | **New.** Full IDBERRY seed (see below). |
| `src/migration-scripts/initial-data-seed.ts` | Replaced the Medusa demo data (Europe region, T-shirts) with a call to the IDBERRY seed, so the first `db:migrate` creates the IDBERRY store. |
| `src/scripts/seed-demo-products.ts` | **Removed** (clothing demo data). |
| `src/lib/region-store-policies.ts` | Added `IDBERRY_REGION_STORE_POLICIES` (7-day window to match the 7-day replacement warranty; placeholder shipping/transit values). |
| `.env.template` | IDBERRY defaults + `PAYSTACK_SECRET_KEY`. |

**What the seed creates**
- Store **IDBERRY Beauty**: currencies NGN (default) + USD
- Sales channel **IDBERRY Web Store** + publishable API key (token printed in the log)
- Regions: **Nigeria** (NGN, `ng`) and **International** (USD: US, CA, GB, IE, DE, FR, NL, BE, IT, ES, GH, ZA, KE, AE, AU), both with `pp_paystack_paystack` + `pp_system_default` (manual)
- Tax regions for each country (system provider, 0% until configured)
- Stock location **IDBERRY Lagos Studio** (2 Prince Durotoye Street, Agege) with stock 1000 per SKU (placeholder)
- Shipping: Lagos Delivery ₦3,500 · Nationwide ₦7,500 · International Express $45. **All placeholders.**
- Collections: Snow White, Half Cast, Caramel Glow, Royal Customized, Targeted Care, Little Ones, Herbal
- Concern categories: Glow & Even Tone, Dark Spots & Breakouts, Scars & Stretch Marks, Knees & Knuckles, Kids
- Product-type tags: Set, Soap, Cream, Lotion, Cleanser & Bath, Scrub, Oil, Serum, Other
- **71 products**, one "Standard" variant each, published, thumbnail + image hot-linked from `idberrybeauty.com`,
  prices in USD (real list prices) and NGN (**placeholder = USD × 1550**, see `NGN_PER_USD` in the seed)
- `source_url` (the old WordPress product URL) is kept in the data file only — use it to build 301 redirects from the old site. It is deliberately **not** stored in product metadata, because metadata is public via the Store API and the old slugs contain non-compliant "whitening" wording.
- One of the two "Flawless Brightening Kids Lotion" listings was renamed "Flawless Brightening Baby Lotion" (its legacy URL is `/brightening-baby-lotion/`) so names and handles are unique.

### Storefront (`apps/storefront`)
| Area | Change |
|---|---|
| Brand | Store name "IDBERRY Beauty" everywhere (nav, footer, checkout, account, metadata, JSON-LD). Default region `ng`. |
| Theme | Tailwind colours `ivory #FAF6F1`, `berry #5B1A3A` (+ dark/light), `blush #E9CFC8`, `gold #B8925A`, `ink #1E1416`. Fonts via `next/font/google`: **Cormorant Garamond** (`font-serif`, all h1–h3) + **Inter** (`font-sans`, body). |
| `src/lib/idberry.ts` | **New.** All brand copy in one place: contact, hero, trust bar, collections + blurbs, concerns, story, pillars, founder quote, wholesale, consultation, FAQ. Edit copy here. |
| Homepage | New hero ("Radiance, made in Lagos." / "Luxury skincare for skin that glows on its own terms."), trust bar, collections grid, shop-by-concern + WhatsApp consultation, product rails (first 3 collections, 6 products each), Our Story + pillars, founder quote band, wholesale/private-label CTA, FAQ (with FAQPage JSON-LD). |
| Layout | Announcement bar, serif wordmark, Shop/Collections links; footer with address, phone, email, hours, Instagram @idberry_beauty_products, WhatsApp; Medusa links/CTA removed. Floating WhatsApp button (wa.me/2347033287766) on every page. |
| Checkout | **Paystack** option: selecting it initializes a session with the customer's email; the review step shows "Pay securely with Paystack", which redirects to Paystack's hosted page (`authorization_url`). New route `src/app/api/paystack/callback/route.ts` verifies the reference belongs to the cart and completes the cart (backend re-verifies with Paystack). |
| `next.config.js` | `images.remotePatterns` for `idberrybeauty.com` and `www.idberrybeauty.com`; 301 redirects from the old WordPress URLs and `/blog`; file tracing for `content/`. |
| Blog & SEO | **The Glow Journal** (MDX blog), site-wide metadata + JSON-LD, sitemap, robots (AI crawlers allowed), RSS, `llms.txt` / `llms-full.txt`. See section 8. |

---

## 2. Environment variables

### Backend — `apps/backend/.env`
| Var | Example | Notes |
|---|---|---|
| `DATABASE_URL` | `postgres://postgres:postgres@localhost:5432/idberry` | Postgres 15+ |
| `REDIS_URL` | `redis://localhost:6379` | Optional locally, recommended in prod |
| `JWT_SECRET`, `COOKIE_SECRET` | long random strings | **Change in production** |
| `STORE_CORS` | `http://localhost:8000,https://idberrybeauty.com` | Storefront origins |
| `ADMIN_CORS` | `http://localhost:9000,https://api.idberrybeauty.com` | Admin origins |
| `AUTH_CORS` | union of the two above | |
| `PAYSTACK_SECRET_KEY` | `sk_test_…` / `sk_live_…` | From Paystack dashboard → Settings → API Keys |
| `PAYSTACK_REFERENCE_PREFIX` | `IDB-` | Optional |

### Storefront — `apps/storefront/.env.local`
| Var | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `http://localhost:9000` | |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | `pk_…` | Printed at the end of the seed, or Admin → Settings → Publishable API Keys |
| `NEXT_PUBLIC_DEFAULT_REGION` | `ng` | |
| `NEXT_PUBLIC_BASE_URL` | `https://idberrybeauty.com` | Canonicals, sitemap |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | `pk_test_…` | Only if you switch to the Paystack Inline popup |

---

## 3. Local setup

Prereqs: Node **22.23.4+** (the starter's `engines`), pnpm 10, Postgres 15+, Redis (optional locally).

```bash
pnpm install

# Database
createdb idberry                       # or: docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:16
cp apps/backend/.env.template apps/backend/.env      # fill in DATABASE_URL, PAYSTACK_SECRET_KEY
cd apps/backend
npx medusa db:migrate                  # runs migrations AND the IDBERRY seed (first run only)
#   On a DB that was already migrated with the demo seed, instead run:
#   npx medusa exec ./src/scripts/seed-idberry.ts     (expects an otherwise empty store)
npx medusa user -e you@idberrybeauty.com -p 'a-strong-password'   # admin login
pnpm dev                               # backend + admin on http://localhost:9000/app

# Storefront (new terminal)
cd apps/storefront
cp .env.template .env.local            # paste the publishable key from the seed log
pnpm dev                               # http://localhost:8000/ng
```

### Paystack setup
1. Paystack dashboard → Settings → API Keys & Webhooks:
   - **Callback URL**: `https://<storefront>/api/paystack/callback` (locally use an ngrok/Cloudflare tunnel URL)
   - **Webhook URL**: `https://<backend>/hooks/payment/paystack_paystack`
2. Enable the currencies you sell in (NGN; USD needs Paystack approval). The plugin charges in the cart's own currency and does **no FX conversion**.
3. In Admin → Settings → Regions, confirm Paystack is enabled for Nigeria and International (the seed does this).

---

## 4. Deploying

- **Backend + admin**: Railway, Render or DigitalOcean App Platform, with managed **Postgres** and **Redis**.
  Build `pnpm --filter @dtc/backend build`, start `cd apps/backend/.medusa/server && npx medusa start` (run `npx medusa db:migrate` as a release/pre-deploy command).
  For production, switch to Redis-backed modules (event bus, workflow engine, caching/locking) per the Medusa deployment guide,
  and set `MEDUSA_WORKER_MODE` (`server` + `worker` instances) if traffic grows. Use a custom domain like `api.idberrybeauty.com`.
- **File storage**: product images are currently hot-linked from the old WordPress site. Before decommissioning it, upload
  images to S3/Cloudflare R2 via the Medusa S3 file provider and add that host to `next.config.js` `remotePatterns`.
- **Storefront**: Vercel (root directory `apps/storefront`), env vars from section 2, domain `idberrybeauty.com`.
- Point the Paystack callback/webhook URLs at the production domains and switch to live keys.

---

## 5. Compatibility caveats

- **medusa-paystack targets Medusa 2.16.x** (`peerDependencies: @medusajs/framework 2.16.0`); this starter is on **2.22.1**.
  pnpm installs it with an "unmet peer" warning. The provider only uses the stable `AbstractPaymentProvider` API, so it is
  expected to work, but it has **not been run end-to-end** here. Test a full Paystack test-mode checkout before go-live.
  Fallbacks if it breaks: pin the backend to Medusa 2.16.x, vendor the plugin's `service.ts` into `src/modules/paystack`
  (it is small, MIT), or use another Paystack provider.
- The plugin does not send a `callback_url` to Paystack, so the redirect target is the dashboard Callback URL (above).
  If you need per-environment callbacks, subclass the provider (see plugin README "Custom settlement currency") and add `callback_url`.
- The checkout reads `authorization_url` (medusa-paystack). `getPaystackAuthorizationUrl()` also accepts
  `paystackTxAuthorizationUrl` in case you swap to the `medusa-payment-paystack` plugin.
- Starter requires Node **≥ 22.23.4**.
- Stripe code from the starter is left in place but inactive (no Stripe provider configured).

---

## 6. TODO before launch (client inputs)

- [ ] **Real NGN prices** (seed uses USD × 1550 placeholders) and confirm USD prices for diaspora
- [ ] **NAFDAC registration numbers** per product (`metadata.nafdac_no` placeholder)
- [ ] **Ingredients, descriptions and how-to-use** per product (seed has one-line placeholders)
- [ ] **High-res product and founder photos**; move images off the WordPress host
- [ ] **Shipping zones & rates** (Lagos / nationwide / international couriers) and delivery times
- [ ] Tax/VAT setup (7.5% NG VAT?) with the client's accountant
- [ ] Stock quantities (seed sets 1000 per SKU)
- [ ] Confirm FAQ answers (results timeline, tone guidance, shipping) and replace placeholder policy pages (`/shipping`, `/returns`, `/terms`, `/privacy`)
- [ ] Logo files + favicon / OG images (`src/app/opengraph-image.jpg`, `twitter-image.jpg`, `public/favicon.ico` are still the starter's)
- [ ] Testimonials / before-afters (with written consent), TikTok handle
- [ ] Decide placement for Body Contour, Intimate and Student lines (not in this catalogue)
- [ ] Paystack live keys, NGN/USD enablement, callback + webhook URLs
- [ ] Search: the store page uses the starter's Medusa search index; verify product search after seeding

---

## 7. Verification status (at hand-off)

- ✅ `pnpm install` (whole workspace) succeeded; `medusa-paystack@0.2.0` installed against `@medusajs/framework@2.22.1` with an unmet-peer warning.
- ✅ Backend `tsc --noEmit` passes (seed script, config, migration script).
- ✅ The Paystack provider module loads under Medusa 2.22.1 and its service extends 2.22's `AbstractPaymentProvider`.
- ✅ Storefront `tsc --noEmit` passes and `next build` (Next 16.3.8, Turbopack) completes.
- ✅ **Blog & SEO update (2026-10-26)**: storefront `tsc --noEmit` passes; `next build` (Next 16.3.8, Turbopack) completes with the Journal routes, `/journal/rss.xml`, `/llms-full.txt`, `/robots.txt` and `/sitemap.xml`. Smoke-tested with `next start` against a stub Medusa API: all five posts, the index, category pages and the homepage rail return 200 with correct title/canonical/OG/Twitter tags and JSON-LD; old product URLs and `/blog` return 301s to the right targets.
- ⚠️ Journal pages were not checked visually in a browser (no browser in the build environment) — review layout on desktop and mobile before launch.
- ⚠️ **Not run**: backend server, migrations, seed, and a live Paystack checkout (no Postgres in the build environment). Run these locally first (section 3) and fix any seed error before deploying.

---

## 8. Blog (The Glow Journal) & SEO / GEO

### What's included
| Area | Where |
|---|---|
| Posts (MDX + YAML frontmatter) | `apps/storefront/content/journal/*.mdx` |
| Post loader (the only code that reads posts) | `apps/storefront/src/lib/journal.ts` (`gray-matter`) |
| MDX renderer | `src/modules/journal/components/mdx-content.tsx` (`next-mdx-remote@6` RSC, `remark-gfm`, JS expressions blocked) |
| Journal UI | `src/modules/journal/**` (cards, category filter, pagination, breadcrumbs, key takeaways, TOC, "Shop the ritual", FAQ, author bio, homepage rail) |
| Routes | `/[cc]/journal` · `/[cc]/journal/page/[n]` · `/[cc]/journal/[slug]` · `/[cc]/journal/category/[category]` (+ `/page/[n]`) |
| Feeds / GEO | `/journal/rss.xml`, `/llms.txt` (static: `public/llms.txt`), `/llms-full.txt` (generated from posts) |
| SEO helpers | `src/lib/seo.ts` (`buildPageMetadata`, Organization / HealthAndBeautyBusiness / WebSite / Person / BreadcrumbList / FAQPage JSON-LD) |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Redirects | `next.config.js` `redirects()` + `src/data/legacy-redirects.json` |

Journal is linked from the nav, side menu, footer and a 3-post rail on the homepage.

### How to add a post
1. Create `apps/storefront/content/journal/<slug>.mdx` (copy an existing post as a template).
2. Fill in the frontmatter:
   ```yaml
   ---
   title: "Question-led, specific title"
   slug: "my-post-slug"              # must match the file name; becomes the URL
   description: "150–160 chars, answer-first. Used for meta description, OG, RSS."
   date: "2026-11-01"                # YYYY-MM-DD; future dates stay hidden in production
   updated: "2026-11-01"             # bump when you materially edit the post
   category: "Rituals"               # Rituals | Skin Concerns | Lagos Living | Founder | (new ones auto-create a category page)
   tags: ["sunscreen", "harmattan"]
   author: "idunnunmi-esan"          # key in AUTHORS (src/lib/idberry.ts)
   image: "https://…jpg"             # host must be allowed in next.config.js images.remotePatterns
   imageAlt: "Describe the image"
   keyTakeaways: ["…", "…"]          # 3–5 bullets, shown at the top + used by answer engines
   faq:                              # rendered on the page + FAQPage JSON-LD
     - q: "Question?"
       a: "Direct answer."
   relatedProducts: ["all-clear-facial-set"]   # Medusa product handles for "Shop the ritual"
   draft: false                      # optional; true hides the post in production
   ---
   ```
3. Write the body in Markdown. Start with a one-paragraph, **answer-first** intro; use **question-style `##` headings** (they become the table of contents and anchor links). Don't use `{ }` expressions — they're stripped for safety.
4. Copy rules: no "whitening" / "shades lighter" language, no medical claims (no "cure", "treat", "remove"); recommend sunscreen and patch tests; point to a dermatologist for persistent issues.
5. Add the post to the "Journal articles" list in `public/llms.txt`.
6. Commit and deploy. Pages, sitemap, RSS and `/llms-full.txt` pick it up automatically (they revalidate hourly).

**The five launch posts are drafts written for the brand and attributed to the founder — have Idunnunmi / the client review and approve them before launch.**

If a related product handle doesn't exist (or the backend is down), "Shop the ritual" falls back to a named link to `/products/<handle>`; add the name to `PRODUCT_NAME_FALLBACKS` in `src/lib/journal.ts` for nicer fallback labels.

**Moving to a CMS later:** everything reads posts through `getAllPosts()` / `getPostBySlug()` in `src/lib/journal.ts`. To let non-developers edit, swap those functions for a headless CMS query (e.g. **Payload** — self-hosted, TypeScript, can live next to Medusa — or **Sanity**), keeping the same `JournalPost` shape. The MDX body can stay MDX/Markdown or move to the CMS's rich-text renderer.

### SEO details
- **Metadata**: every storefront page has `generateMetadata` → title template `%s | IDBERRY Beauty`, description, canonical, Open Graph, Twitter card. (Fixed duplicated "| IDBERRY Beauty" titles on product, collection and category pages, and the category canonical, which was relative.)
- **Journal canonicals** point to the `/ng/…` copy for every region (the content is identical), and only `/ng` Journal URLs are in the sitemap. Shop pages keep per-country URLs as before.
- **JSON-LD**: site-wide (in the `(main)` layout) Organization + HealthAndBeautyBusiness (address, phone, email, opening hours, Instagram `sameAs`) + WebSite with SearchAction + Person (founder), linked by `@id`. Product pages: Product + Offer (existing) + BreadcrumbList. Posts: BlogPosting (Article) + FAQPage + BreadcrumbList + Person. Journal index: Blog + BreadcrumbList.
- **robots.txt** allows all crawlers plus explicit rules for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended; cart/checkout/account/order/api stay disallowed.
- **Redirects (301)**: 71 old WooCommerce product URLs (`/product/<old-slug>/`) → `/ng/products/<new-handle>`; any other `/product/*`, `/shop`, `/product-category/*` → `/ng/store`; `/my-account/*` → `/ng/account`; `/blog`, `/blog/*`, `/[cc]/blog*` → Journal. Regenerate the product map after catalogue changes: `node apps/storefront/scripts/generate-legacy-redirects.mjs`. (Trailing-slash URLs first get Next's automatic 308 to the slash-less URL, then the 301.)
- **Images**: the default OG/logo image is the Snow White collection photo until the client supplies a logo and a 1200×630 OG image — replace `DEFAULT_OG_IMAGE` in `src/lib/seo.ts` and `src/app/opengraph-image.jpg` / `twitter-image.jpg` (still the starter's).
- Set `NEXT_PUBLIC_BASE_URL=https://idberrybeauty.com` in production; RSS and `/llms-full.txt` use it (fallback `https://idberrybeauty.com`). `public/llms.txt` has absolute `https://idberrybeauty.com` links — update if the domain changes.

### GEO / local SEO launch checklist
- [ ] **Google Search Console**: verify the domain (DNS TXT), submit `https://idberrybeauty.com/sitemap.xml`, check Page indexing + Enhancements (Products, Breadcrumbs, FAQ), and use URL Inspection on the Journal posts. Watch the Crawl stats for the old WordPress URLs redirecting.
- [ ] **Bing Webmaster Tools**: import from Search Console, submit the sitemap (Bing also feeds ChatGPT search and Copilot). Enable IndexNow if available on the host.
- [ ] **Google Business Profile**: claim/verify "IDBERRY Beauty" at 2 Prince Durotoye Street, beside Vitafoam, Iju Road, Agege, Lagos 100216; category "Skin care products store" / "Beauty products vendor"; hours Mon–Fri 09:00–19:00, Sat 10:00–18:00; phone +234 703 328 7766; website link to `/ng`; photos of the studio and products; post Journal articles as Updates.
- [ ] **Consistent NAP** (name, address, phone) everywhere — site footer/JSON-LD (`BRAND`/`BUSINESS` in `src/lib/idberry.ts`), Google Business Profile, Instagram bio, Facebook page, Bing Places, Apple Business Connect, Nigerian directories (VConnect, BusinessList.com.ng, Finelib). Use exactly: *IDBERRY Beauty, 2 Prince Durotoye Street, beside Vitafoam, Iju Road, Agege, Lagos 100216 · +234 703 328 7766 · info@idberrybeauty.com*.
- [ ] **Reviews**: ask happy customers for Google reviews (share the GBP review link on WhatsApp after delivery), reply to every review; only publish testimonials/before-afters with written consent. (Product review stars in JSON-LD need a real reviews system first — don't add fake ratings.)
- [ ] Add `sameAs` links (Facebook, TikTok, Wikipedia/Wikidata if created, press articles) to `organizationJsonLd` / `FOUNDER.sameAs` once confirmed.
- [ ] Get cited: pitch the founder story to Nigerian press (Vanguard, City People have covered her) and link back to the Journal; answer engines weight third-party mentions.
- [ ] Publish 2–4 Journal posts a month answering real customer WhatsApp questions; keep `updated` dates honest.
- [ ] Validate with Google's Rich Results Test and schema.org validator after deploy; check `/robots.txt`, `/sitemap.xml`, `/journal/rss.xml`, `/llms.txt`, `/llms-full.txt` return 200.
