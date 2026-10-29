import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// S3-compatible file storage on Cloudflare R2. The file module is
// only registered when every required variable is present, so local
// development without credentials still starts on the default local file
// provider. With the module registered, Admin uploads get absolute
// public URLs instead of localhost addresses, and Admin previews load.
// See DEPLOY-STAGING.md for the setup checklist. No bucket or URL is
// hardcoded here; everything comes from the environment. R2 requires
// S3_ENDPOINT (https://<account-id>.r2.cloudflarestorage.com) and
// S3_REGION "auto".
const s3FileUrl = process.env.S3_FILE_URL?.replace(/\/+$/, '')
const s3Configured = Boolean(
  s3FileUrl &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_REGION &&
  process.env.S3_BUCKET &&
  process.env.S3_ENDPOINT
)

const fileModule = s3Configured
  ? {
      resolve: '@medusajs/medusa/file',
      options: {
        providers: [
          {
            resolve: '@medusajs/medusa/file-s3',
            id: 's3',
            options: {
              file_url: s3FileUrl,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              // Omit ACL headers. New S3 buckets use BucketOwnerEnforced
              // ownership and R2 does not support ACLs, so public read
              // must come from the bucket policy or R2 public access.
              acl: false,
              // R2 addresses objects path-style against the account
              // endpoint: https://<account-id>.r2.cloudflarestorage.com/<bucket>/<key>.
              additional_client_config: { forcePathStyle: true },
            },
          },
        ],
      },
    }
  : null

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
    ...(fileModule ? [fileModule] : []),
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
