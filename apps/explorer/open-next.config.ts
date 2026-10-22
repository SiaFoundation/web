import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default {
  // Next's cache lives in the R2 bucket that wrangler.jsonc binds. There is no
  // revalidation queue, because the queue only rebuilds pages that revalidate on a
  // timer, and every explorer page either renders on each request or is built once.
  ...defineCloudflareConfig({ incrementalCache: r2IncrementalCache }),
  // The adapter needs the build in apps/explorer/.next, where a plain `next build`
  // puts it. `nx build` writes to dist/ instead.
  buildCommand: 'bunx next build',
}
