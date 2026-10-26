# IDBERRY backend (Medusa 2.22.1) — Dokploy staging Dockerfile
#
# Dokploy settings for this app:
#   Repository: Julieellis1/idberry, branch main
#   Build type: Dockerfile
#   Build context: repository root (this file is NOT the context root)
#   Dockerfile path: apps/backend/Dockerfile
#   Container port: 9000
#
# Why the context is the repo root: this is a pnpm workspace. The install
# step needs the root pnpm-lock.yaml, pnpm-workspace.yaml and both apps'
# package.json files, or pnpm --frozen-lockfile fails.
#
# Staging only. The start command runs `medusa db:migrate` first, because
# the first migrate also runs the IDBERRY seed (71 products, regions,
# shipping placeholders). Do not run this migrate-on-start pattern against
# a live store without a backup plan.

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
# Copy the WHOLE deps stage, not just root node_modules. This is a pnpm
# workspace: apps/backend/node_modules holds the medusa binary as a
# symlink into root node_modules/.pnpm. Copying only root node_modules
# left the app with no medusa binary, and the Dokploy build failed with
# "medusa: not found". The COPY . . below is filtered by .dockerignore,
# so it does not overwrite node_modules.
COPY --from=deps /app /app
COPY . .
RUN pnpm --filter @dtc/backend build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=9000
# Copy the whole builder workspace for the same symlink reason: the
# runner must keep apps/backend/node_modules alongside root node_modules.
COPY --from=builder /app /app
EXPOSE 9000
# medusa start serves the API on 9000 and the admin dashboard on /app.
# db:migrate is idempotent after the first run; on the first run it seeds
# the IDBERRY store. See README-IDBERRY.md section 3.
CMD ["sh", "-c", "cd apps/backend && npx medusa db:migrate && npx medusa start"]
