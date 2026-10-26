# IDBERRY storefront (Next.js 16) — Dokploy staging Dockerfile
#
# Dokploy settings for this app:
#   Repository: Julieellis1/idberry, branch main
#   Build type: Dockerfile
#   Build context: repository root (this file is NOT the context root)
#   Dockerfile path: apps/storefront/Dockerfile
#   Container port: 8000
#
# NEXT_PUBLIC_* variables are baked into the Next.js build, so they must
# be set as Dokploy BUILD ARGS (not only runtime env) before the first
# build, and the app must be rebuilt if any of them changes. In particular:
#   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api-idberry.teta.dpdns.org
#   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<from the backend seed log / admin>
#   NEXT_PUBLIC_BASE_URL=https://idberry.teta.dpdns.org
#   NEXT_PUBLIC_DEFAULT_REGION=ng
#
# Deploy the backend first, run its first migrate/seed, copy the
# publishable key, then build this storefront with that key.
# Staging only. Do not point NEXT_PUBLIC_BASE_URL at idberrybeauty.com
# until the owner approves the cutover.

FROM node:22-bookworm-slim AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/storefront/package.json apps/storefront/package.json
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION=ng
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION
RUN pnpm --filter @dtc/storefront build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=8000
ENV HOSTNAME=0.0.0.0
# Copy the whole workspace, not just .next: the Journal reads MDX files
# from apps/storefront/content at render time, and next.config.js loads
# apps/storefront/src/data/legacy-redirects.json at startup. A standalone
# output would need those files copied explicitly; this staging image
# trades size for correctness.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps ./apps
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
EXPOSE 8000
CMD ["sh", "-c", "cd apps/storefront && pnpm start"]
