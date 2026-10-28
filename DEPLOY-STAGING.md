# IDBERRY staging deploy on Oracle Dokploy

Staging only. The live WordPress site on idberrybeauty.com is NOT touched
by this guide. Switching to the main domain is a separate, owner-approved
step at the end of this file.

## Staging domains

| App | Staging domain | Dokploy port |
|---|---|---|
| Storefront | https://idberry.teta.dpdns.org | 8000 |
| Backend + admin | https://api-idberry.teta.dpdns.org | 9000 |

Both domains need a Cloudflare A record pointing at the Oracle Dokploy
host, currently 92.5.121.242 (reserved IP, panel at
https://panel.teta.dpdns.org). Without those records the apps can build
but the domains will not resolve and Let's Encrypt cannot issue certs.
This is a user/Cloudflare step; it is not done from the repo.

## Dokploy setup, in order

### 1. Project and services

Create a Dokploy project called `idberry` (production environment is
fine for staging; do not reuse the xylvar project).

Create two services inside it, before the apps:

- Postgres 16, name `idberry-db`, database `idberry`, user `postgres`.
  Let Dokploy generate the password. Note the internal host Dokploy
  shows for it (for example `idberry-db-xxxx`) and the internal port
  5432. The backend DATABASE_URL uses that internal host, not the
  public VPS IP.
- Redis, name `idberry-redis`. Note its internal host and port 6379.

Do not create these services in another project and do not reuse the
xylvar database.

### 2. Backend app (`idberry-backend`)

- Source: GitHub account already connected to Dokploy, repo
  `Julieellis1/idberry`, branch `main`.
- Build type: Dockerfile.
- Build context: repository root.
- Dockerfile path: `apps/backend/Dockerfile`.
- Container port: 9000.
- Domain: `api-idberry.teta.dpdns.org`, HTTPS with Let's Encrypt.

Runtime env vars (set in Dokploy, never in the repo):

```
DATABASE_URL=postgres://postgres:<idberry-db password>@<idberry-db internal host>:5432/idberry
REDIS_URL=redis://<idberry-redis internal host>:6379
JWT_SECRET=<generate a long random string in Dokploy>
COOKIE_SECRET=<generate a long random string in Dokploy>
STORE_CORS=https://idberry.teta.dpdns.org
ADMIN_CORS=https://api-idberry.teta.dpdns.org
AUTH_CORS=https://idberry.teta.dpdns.org,https://api-idberry.teta.dpdns.org
PAYSTACK_SECRET_KEY=<Paystack TEST key only, from the IdBerry Paystack dashboard>
PAYSTACK_REFERENCE_PREFIX=IDB-
NODE_ENV=production
```

Deploy it. The container start command runs `medusa db:migrate`
first. On the first run that migrate also seeds the IDBERRY store:
71 products, Nigeria (NGN) and International (USD) regions, the Lagos
studio stock location, and placeholder shipping rates. Watch the logs
for the seed finishing and for the publishable API key token it prints.

Then create the admin user from the app terminal in Dokploy:

```
cd apps/backend && npx medusa user -e <owner email> -p '<owner-chosen password>'
```

Use an owner email and a password the owner chooses. Do not record
the password in the repo, in chat, or in this guide.

Copy the publishable key from the seed log, or from Admin >
Settings > Publishable API Keys, for step 3. The admin dashboard is at
https://api-idberry.teta.dpdns.org/app.

#### Updating an already-seeded database (images + NGN prices)

The seed only runs on an empty database. On a database seeded before the
local-WebP / NGN-conversion change, after a backend redeploy that includes
the updated catalogue, run this exact command once from the backend app
terminal in Dokploy (it updates existing products in place, never creates
any, is idempotent, and fails loudly on any mismatch — check its log lines
before proceeding):

```
cd apps/backend && npx medusa exec ./src/scripts/update-idberry-images-prices.ts
```

Then redeploy the storefront (step 3) so the new public WebP images in
`apps/storefront/public/images/products/` are served. Do this update-script
run before the storefront redeploy, so the storefront never serves products
whose database records still point at the old WordPress image URLs.

#### Updating the Snow White Plus Radiance Scrub 250g gallery

The 250g scrub has its own four-image gallery (main, studio, lifestyle,
ad). After a backend redeploy that includes the updated catalogue and a
storefront redeploy that includes the four new WebP files, run this exact
command once from the backend app terminal in Dokploy (it updates only
that one product in place, never touches prices or variants, is
idempotent, and fails loudly on any mismatch):

```
cd apps/backend && npx medusa exec ./src/scripts/update-scrub-250g-gallery.ts
```

If the Dokploy terminal starts at `/`, run `cd /app` first, then the
command above.

### 3. Storefront app (`idberry-storefront`)

- Source: same repo and branch.
- Build type: Dockerfile.
- Build context: repository root.
- Dockerfile path: `apps/storefront/Dockerfile`.
- Container port: 8000.
- Domain: `idberry.teta.dpdns.org`, HTTPS with Let's Encrypt.

Set these as BOTH runtime env vars and Dokploy build args, because
Next.js bakes NEXT_PUBLIC_* values into the build. Rebuild the app if
any of them changes:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api-idberry.teta.dpdns.org
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<key copied from step 2>
NEXT_PUBLIC_DEFAULT_REGION=ng
NEXT_PUBLIC_BASE_URL=https://idberry.teta.dpdns.org
```

Deploy it. If the publishable key was not ready at first build time,
rebuild once with the real key; a placeholder key will not fetch
products.

### 4. Paystack staging setup (test mode only)

In the Paystack dashboard, for the test keys used above:

- Callback URL: `https://idberry.teta.dpdns.org/api/paystack/callback`
- Webhook URL: `https://api-idberry.teta.dpdns.org/hooks/payment/paystack_paystack`

Do not switch to live keys on staging. A live Paystack checkout has
not been run for this codebase (see README-IDBERRY.md section 5: the
medusa-paystack plugin targets Medusa 2.16.x and this starter is on
2.22.1, with an unmet-peer warning).

## Staging verification checklist

- https://api-idberry.teta.dpdns.org/app loads and the admin login works.
- https://idberry.teta.dpdns.org/ng loads, and /ng/store lists products.
- A product page, a collection page, and /ng/journal load, and the
  Journal posts render.
- https://idberry.teta.dpdns.org/sitemap.xml and /robots.txt return 200.
- An old WordPress URL, for example a /product/<old-slug>/ URL from
  legacy-redirects.json, returns a 301 to the new /ng/products/<handle>.
- A full Paystack TEST checkout completes, with no real money moved.

## What is still placeholder on staging (do not call this live-ready)

- NGN prices are a conversion, not real Naira prices: USD × 1350, rounded to
  the nearest 500 Naira (rate chosen 28 Oct 2026, when the official window
  was about 1341–1353). Owner confirmation of real Naira prices is still
  outstanding; see README-IDBERRY.md section 6.
- Stock is 1000 per SKU, shipping rates are placeholders (Lagos
  3500 NGN, nationwide 7500 NGN, international $45), tax is 0% until
  configured, and NAFDAC numbers, ingredients, descriptions and
  how-to-use are one-line placeholders.
- Product images and Glow Journal cover images are local WebP files in the
  storefront public folder
  (`apps/storefront/public/images/products/<handle>.webp`, relative paths
  in the catalogue and journal frontmatter, so no repointing is needed on
  the main-domain cutover). The old WordPress site still hosts the
  originals. Existing databases need the update
  script in step 2 above run once, then a storefront redeploy, before the
  new images and NGN prices show on staging.
- Logo, favicon and OG images are still the starter's. Testimonials
  and before-afters need written consent before publishing.
- The five Glow Journal posts are drafts attributed to the founder
  and need Idunnunmi's review and approval before launch.

## Switching to the main domain later (owner approval required)

1. Get owner sign-off on staging, real NGN prices, shipping, tax,
   NAFDAC/ingredients, images, and the Journal posts.
2. Run a Paystack test checkout on staging, then switch Paystack to
   live keys and update the Paystack callback/webhook URLs to the
   main-domain versions.
3. Change, then rebuild: NEXT_PUBLIC_BASE_URL to
   https://idberrybeauty.com, and STORE_CORS / ADMIN_CORS / AUTH_CORS
   to the main-domain and api-main-domain values in use at that time.
4. Point DNS for idberrybeauty.com (and the chosen api subdomain) at
   the Dokploy host, and only then retire the WordPress site, after
   the product images have been moved off it.
