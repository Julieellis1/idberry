/**
 * IDBERRY Beauty seed.
 *
 * Creates the IDBERRY store from scratch on an EMPTY database:
 *   - store "IDBERRY Beauty" (NGN default, USD secondary)
 *   - regions: Nigeria (NGN) and International (USD), Paystack + manual payment
 *   - tax regions, Lagos stock location, shipping zones + placeholder shipping options
 *   - sales channel "IDBERRY Web Store" + publishable API key
 *   - 7 collections, 5 concern categories, product-type tags
 *   - all 71 catalogue products (one "Standard" variant each), USD + NGN prices,
 *     thumbnails are local WebP files in the storefront public folder
 *     ("/images/products/<handle>.webp"), served from the storefront domain
 *
 * It runs automatically on the first `medusa db:migrate` (see
 * src/migration-scripts/initial-data-seed.ts). To run it by hand on a fresh DB:
 *
 *   npx medusa exec ./src/scripts/seed-idberry.ts
 *
 * Re-running on a DB that already has the IDBERRY store is a no-op.
 */
import type { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductTagsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"
import { IDBERRY_CATALOGUE } from "../data/idberry-catalogue"
import { IDBERRY_REGION_STORE_POLICIES } from "../lib/region-store-policies"

/**
 * NGN conversion rate chosen 28 Oct 2026. This is a CONVERSION, not an
 * owner-supplied Naira price list: the official USD/NGN window on 28 Oct 2026
 * was about 1341-1353, so 1350 sits inside it. NGN amounts are rounded to
 * the nearest 500 Naira. Owner confirmation of real Naira prices is still
 * outstanding; when the owner supplies a real Naira price list, replace
 * these converted amounts. USD prices are the real list prices and are
 * unchanged.
 */
const NGN_PER_USD = 1350
const NGN_ROUND_TO = 500

/** Payment providers enabled per region. `pp_paystack_paystack` comes from medusa-paystack (id "paystack"). */
const PAYMENT_PROVIDERS = ["pp_paystack_paystack", "pp_system_default"]

const NIGERIA_COUNTRIES = ["ng"]
/** Diaspora / international markets served in USD. Extend as needed. */
const INTERNATIONAL_COUNTRIES = [
  "us", "ca", "gb", "ie", "de", "fr", "nl", "be", "it", "es",
  "gh", "za", "ke", "ae", "au",
]

const COLLECTIONS: { title: string; handle: string; description: string }[] = [
  { title: "Snow White", handle: "snow-white", description: "Our signature radiance ritual for a luminous, even complexion." },
  { title: "Half Cast", handle: "half-cast", description: "A golden-toned glow ritual for warm, honeyed radiance." },
  { title: "Caramel Glow", handle: "caramel-glow", description: "For deep, rich tones that want to stay rich and simply glow." },
  { title: "Royal Customized", handle: "royal-customized", description: "Our most indulgent ritual, tailored to you." },
  { title: "Targeted Care", handle: "targeted-care", description: "Focused treatments for scars, stretch marks, spots, breakouts and dark knuckles." },
  { title: "Little Ones", handle: "little-ones", description: "Gentle care for kids' skin and hair." },
  { title: "Herbal", handle: "herbal", description: "Plant-powered essentials: herbal black soap and hair care." },
]

const CONCERN_CATEGORIES: { name: string; handle: string; description: string }[] = [
  { name: "Glow & Even Tone", handle: "glow-and-even-tone", description: "Rituals for radiance and an even-looking complexion." },
  { name: "Dark Spots & Breakouts", handle: "dark-spots-and-breakouts", description: "Targeted care for spots, blemishes and breakouts." },
  { name: "Scars & Stretch Marks", handle: "scars-and-stretch-marks", description: "Care for the look of scars and stretch marks." },
  { name: "Knees & Knuckles", handle: "knees-and-knuckles", description: "For dark knees, knuckles and elbows." },
  { name: "Kids", handle: "kids", description: "Gentle formulas for little ones." },
]

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

export default async function seedIdberry({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(ModuleRegistrationName.FULFILLMENT)

  const { data: existingStores } = await query.graph({ entity: "store", fields: ["id", "name"] })
  if (existingStores.some((s) => s.name === "IDBERRY Beauty")) {
    logger.info("IDBERRY store already seeded — skipping.")
    return
  }

  // ---- Sales channel + publishable key ------------------------------------
  logger.info("Seeding IDBERRY store…")
  const {
    result: [salesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [{ name: "IDBERRY Web Store", description: "idberrybeauty.com storefront" }],
    },
  })

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [{ title: "IDBERRY Storefront", type: "publishable", created_by: "" }],
    },
  })

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [salesChannel.id] },
  })

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "IDBERRY Beauty",
          supported_currencies: [
            { currency_code: "ngn", is_default: true },
            { currency_code: "usd", is_default: false },
          ],
          default_sales_channel_id: salesChannel.id,
        },
      ],
    },
  })

  // ---- Regions -------------------------------------------------------------
  logger.info("Seeding regions (Nigeria NGN, International USD)…")
  const { result: regions } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Nigeria",
          currency_code: "ngn",
          countries: NIGERIA_COUNTRIES,
          payment_providers: PAYMENT_PROVIDERS,
          metadata: IDBERRY_REGION_STORE_POLICIES,
        },
        {
          name: "International",
          currency_code: "usd",
          countries: INTERNATIONAL_COUNTRIES,
          payment_providers: PAYMENT_PROVIDERS,
          metadata: IDBERRY_REGION_STORE_POLICIES,
        },
      ],
    },
  })
  const nigeria = regions.find((r) => r.name === "Nigeria")!
  const international = regions.find((r) => r.name === "International")!

  // TODO: confirm VAT handling with the client's accountant (Nigeria VAT is 7.5%).
  await createTaxRegionsWorkflow(container).run({
    input: [...NIGERIA_COUNTRIES, ...INTERNATIONAL_COUNTRIES].map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  })

  // ---- Stock location + fulfillment ---------------------------------------
  logger.info("Seeding Lagos stock location and shipping…")
  const {
    result: [stockLocation],
  } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "IDBERRY Lagos Studio",
          address: {
            address_1: "2 Prince Durotoye Street, beside Vitafoam, Iju Road",
            city: "Agege, Lagos",
            postal_code: "100216",
            country_code: "NG",
          },
        },
      ],
    },
  })

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  })

  // Default shipping profile is created by a core migration.
  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  const shippingProfile = shippingProfiles[0]

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "IDBERRY Lagos delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Nigeria",
        geo_zones: NIGERIA_COUNTRIES.map((country_code) => ({ country_code, type: "country" as const })),
      },
      {
        name: "International",
        geo_zones: INTERNATIONAL_COUNTRIES.map((country_code) => ({ country_code, type: "country" as const })),
      },
    ],
  })
  const ngZone = fulfillmentSet.service_zones.find((z) => z.name === "Nigeria")!
  const intlZone = fulfillmentSet.service_zones.find((z) => z.name === "International")!

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  })

  const storeRules = [
    { attribute: "enabled_in_store", value: "true", operator: "eq" as const },
    { attribute: "is_return", value: "false", operator: "eq" as const },
  ]

  // PLACEHOLDER shipping rates — replace with the client's real courier rates.
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Lagos Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: ngZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Lagos", description: "Delivery within Lagos, 1–2 working days.", code: "lagos" },
        prices: [{ currency_code: "ngn", amount: 3500 }, { region_id: nigeria.id, amount: 3500 }],
        rules: storeRules,
      },
      {
        name: "Nationwide Delivery",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: ngZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Nationwide", description: "Outside Lagos, 2–5 working days.", code: "nationwide" },
        prices: [{ currency_code: "ngn", amount: 7500 }, { region_id: nigeria.id, amount: 7500 }],
        rules: storeRules,
      },
      {
        name: "International Express",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: intlZone.id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "International", description: "DHL/courier, 5–10 working days.", code: "international" },
        prices: [{ currency_code: "usd", amount: 45 }, { region_id: international.id, amount: 45 }],
        rules: storeRules,
      },
    ],
  })

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [salesChannel.id] },
  })

  // ---- Collections, categories, tags --------------------------------------
  logger.info("Seeding collections, concern categories and tags…")
  const { result: collections } = await createCollectionsWorkflow(container).run({
    input: {
      collections: COLLECTIONS.map((c) => ({
        title: c.title,
        handle: c.handle,
        metadata: { description: c.description },
      })),
    },
  })
  const collectionId = (title: string) => {
    const c = collections.find((x) => x.title === title)
    if (!c) {
      throw new Error(`Unknown collection "${title}"`)
    }
    return c.id
  }

  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: CONCERN_CATEGORIES.map((c) => ({
        name: c.name,
        handle: c.handle,
        description: c.description,
        is_active: true,
      })),
    },
  })
  const categoryId = (name: string) => {
    const c = categories.find((x) => x.name === name)
    if (!c) {
      throw new Error(`Unknown concern category "${name}"`)
    }
    return c.id
  }

  const typeValues = Array.from(new Set(IDBERRY_CATALOGUE.map((p) => p.type)))
  const { result: tags } = await createProductTagsWorkflow(container).run({
    input: { product_tags: typeValues.map((value) => ({ value })) },
  })
  const tagId = (value: string) => tags.find((t) => t.value === value)!.id

  // One shared option so every product has a single purchasable variant.
  const {
    result: [formatOption],
  } = await createProductOptionsWorkflow(container).run({
    input: { product_options: [{ title: "Format", values: ["Standard"] }] },
  })

  // ---- Products ------------------------------------------------------------
  logger.info(`Seeding ${IDBERRY_CATALOGUE.length} products…`)
  const BATCH = 15
  for (let i = 0; i < IDBERRY_CATALOGUE.length; i += BATCH) {
    const batch = IDBERRY_CATALOGUE.slice(i, i + BATCH)
    await createProductsWorkflow(container).run({
      input: {
        products: batch.map((p) => ({
          title: p.title,
          handle: p.handle,
          // TODO: replace with real product descriptions, ingredients, how-to-use and NAFDAC number.
          description: `${p.title} from the IDBERRY ${p.collection} collection.`,
          status: ProductStatus.PUBLISHED,
          thumbnail: p.image,
          images: [{ url: p.image }],
          collection_id: collectionId(p.collection),
          category_ids: p.concerns.map(categoryId),
          tag_ids: [tagId(p.type)],
          shipping_profile_id: shippingProfile.id,
          metadata: {
            product_type: p.type,
            nafdac_no: null, // TODO: add NAFDAC registration number
          },
          options: [{ id: formatOption.id }],
          variants: [
            {
              title: "Standard",
              sku: `IDB-${slug(p.handle).toUpperCase()}`.slice(0, 60),
              options: { Format: "Standard" },
              prices: [
                { currency_code: "usd", amount: p.price_usd },
                // NGN CONVERSION (28 Oct 2026): USD x 1350, rounded to the
                // nearest 500 Naira. NOT a real Naira price list; owner
                // confirmation of real Naira prices is still outstanding.
                { currency_code: "ngn", amount: Math.round((p.price_usd * NGN_PER_USD) / NGN_ROUND_TO) * NGN_ROUND_TO },
              ],
            },
          ],
          sales_channels: [{ id: salesChannel.id }],
        })),
      },
    })
    logger.info(`  …${Math.min(i + BATCH, IDBERRY_CATALOGUE.length)}/${IDBERRY_CATALOGUE.length}`)
  }

  // ---- Inventory -----------------------------------------------------------
  // PLACEHOLDER stock levels — set real quantities in Admin → Inventory.
  const { data: inventoryItems } = await query.graph({ entity: "inventory_item", fields: ["id"] })
  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 1000,
        inventory_item_id: item.id,
      })),
    },
  })

  logger.info(
    `IDBERRY seed complete. Publishable API key (put in storefront NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY): ${publishableApiKey.token}`
  )
}
