import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: '@medusajs/medusa/payment',
      options: {
        providers: [
          {
            // medusa-paystack (github.com/champ3oy/medusa-paystack).
            // NOTE: plugin targets Medusa 2.16.x; this starter is on 2.22.1 — see README-IDBERRY.md.
            // Provider id in regions/storefront: pp_paystack_paystack
            // Webhook URL to set in the Paystack dashboard: <backend>/hooks/payment/paystack_paystack
            resolve: 'medusa-paystack/providers/paystack',
            id: 'paystack',
            options: {
              secret_key: process.env.PAYSTACK_SECRET_KEY,
              reference_prefix: process.env.PAYSTACK_REFERENCE_PREFIX || 'IDB-',
            },
          },
        ],
      },
    },
  ],
})
