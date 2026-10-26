const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * Medusa Cloud-related environment variables
 */
const S3_HOSTNAME = process.env.MEDUSA_CLOUD_S3_HOSTNAME
const S3_PATHNAME = process.env.MEDUSA_CLOUD_S3_PATHNAME

/**
 * 301 map from the legacy WordPress/WooCommerce site (idberrybeauty.com) to
 * the new Medusa handles. Regenerate with `node scripts/generate-legacy-redirects.mjs`.
 */
const LEGACY_PRODUCT_REDIRECTS = require("./src/data/legacy-redirects.json")
const DEFAULT_REGION = (process.env.NEXT_PUBLIC_DEFAULT_REGION || "ng").toLowerCase()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Link", value: '</.well-known/ucp>; rel="ucp"' }],
      },
      {
        source: "/:countryCode/products/:handle",
        headers: [{ key: "Vary", value: "Accept" }],
      },
    ]
  },
  async redirects() {
    const to = (path) => `/${DEFAULT_REGION}${path}`
    return [
      // Old product URLs -> new product handles (one-to-one)
      ...LEGACY_PRODUCT_REDIRECTS.map(({ source, handle }) => ({
        source,
        destination: to(`/products/${handle}`),
        statusCode: 301,
      })),
      // Any other old product URL -> shop
      { source: "/product/:slug*", destination: to("/store"), statusCode: 301 },
      // Old WooCommerce pages
      { source: "/shop", destination: to("/store"), statusCode: 301 },
      { source: "/shop/:path*", destination: to("/store"), statusCode: 301 },
      { source: "/product-category/:path*", destination: to("/store"), statusCode: 301 },
      { source: "/my-account/:path*", destination: to("/account"), statusCode: 301 },
      // Blog -> The Glow Journal
      { source: "/blog", destination: to("/journal"), statusCode: 301 },
      { source: "/blog/:slug*", destination: to("/journal/:slug*"), statusCode: 301 },
      { source: "/journal", destination: to("/journal"), statusCode: 301 },
      { source: "/:countryCode(\\w{2})/blog", destination: "/:countryCode/journal", statusCode: 301 },
      { source: "/:countryCode(\\w{2})/blog/:slug*", destination: "/:countryCode/journal/:slug*", statusCode: 301 },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:countryCode/products/:handle([^/.]+).md",
          destination: "/:countryCode/products/:handle/markdown",
        },
        {
          source: "/:countryCode/products/:handle([^/.]+)",
          has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
          destination: "/:countryCode/products/:handle/markdown",
        },
      ],
    }
  },
  // Journal MDX files are read from disk at render/revalidate time.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      // IDBERRY product photography currently hosted on the legacy WordPress site
      {
        protocol: "https",
        hostname: "idberrybeauty.com",
      },
      {
        protocol: "https",
        hostname: "www.idberrybeauty.com",
      },
      ...(S3_HOSTNAME && S3_PATHNAME
        ? [
            {
              protocol: "https",
              hostname: S3_HOSTNAME,
              pathname: S3_PATHNAME,
            },
          ]
        : []),
    ],
  },
}

module.exports = nextConfig
