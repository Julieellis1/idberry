#!/usr/bin/env node
/**
 * Regenerates src/data/legacy-redirects.json from the backend catalogue
 * (apps/backend/src/data/idberry-catalogue.ts → source_url + handle).
 *
 *   node scripts/generate-legacy-redirects.mjs
 *
 * The JSON is committed so the storefront builds on its own (e.g. Vercel with
 * root directory apps/storefront) without reading the backend package.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const catalogue = path.resolve(here, "../../backend/src/data/idberry-catalogue.ts")
const out = path.resolve(here, "../src/data/legacy-redirects.json")

const ts = fs.readFileSync(catalogue, "utf8")
const json = ts.slice(ts.indexOf("= [") + 2).trim().replace(/;?\s*$/, "")
const items = JSON.parse(json)

const seen = new Set()
const redirects = []
for (const item of items) {
  const { pathname } = new URL(item.source_url)
  const source = pathname.replace(/\/+$/, "")
  if (!source || seen.has(source)) continue
  seen.add(source)
  redirects.push({ source, handle: item.handle })
}

fs.writeFileSync(out, JSON.stringify(redirects, null, 2) + "\n")
console.log(`Wrote ${redirects.length} legacy product redirects to ${path.relative(process.cwd(), out)}`)
