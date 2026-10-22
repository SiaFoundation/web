/**
 * The six Cloudflare Workers this repository deploys, and how they are named.
 *
 * Each deployment is one Worker built from one Nx project and build configuration.
 * explorer is deployed twice, once per network, because the network is compiled into
 * the build. The four daemon dashboards ship the same static export the Go daemons
 * embed, so a preview shows exactly what a daemon serves.
 *
 * Names:
 *   production  https://<worker>.sia-foundation.workers.dev
 *   preview     https://<alias>-<worker>.sia-foundation.workers.dev
 *
 * A branch has one preview alias, shared by every Worker it previews, so `fix/thing` is
 * previewed at `fix-thing-explorer...`, `fix-thing-hostd...` and so on. Each push to the
 * branch uploads a new version of the Worker under the same alias, so the URL stays the
 * same. Production keeps serving whatever main last deployed.
 *
 * Cloudflare has no way to delete an alias. It keeps the 1000 most recent for each
 * Worker and drops the oldest, so a closed branch's preview keeps serving its last
 * version until then.
 */

import { createHash } from 'node:crypto'

export type Deployment = {
  /** Worker name. With `env` set, wrangler names the Worker `<base name>-<env>`. */
  worker: string
  /** Nx project the Worker is built from. */
  project: string
  /** Nx build configuration. */
  configuration: string
  /**
   * `static` serves a Next static export as Workers assets, with no Worker script.
   * `next` runs the app's server on the Worker through the OpenNext adapter.
   */
  kind: 'static' | 'next'
  /** Wrangler environment, for a second Worker described by the same wrangler.jsonc. */
  env?: string
}

export const deployments: Deployment[] = [
  {
    worker: 'explorer',
    project: 'explorer',
    configuration: 'production',
    kind: 'next',
  },
  {
    worker: 'explorer-zen',
    project: 'explorer',
    configuration: 'production-testnet-zen',
    kind: 'next',
    env: 'zen',
  },
  {
    worker: 'hostd',
    project: 'hostd',
    configuration: 'export',
    kind: 'static',
  },
  {
    worker: 'indexd',
    project: 'indexd',
    configuration: 'export',
    kind: 'static',
  },
  {
    worker: 'renterd',
    project: 'renterd',
    configuration: 'export',
    kind: 'static',
  },
  {
    worker: 'walletd',
    project: 'walletd',
    configuration: 'export',
    kind: 'static',
  },
]

/** The workers.dev subdomain of the Sia Foundation Cloudflare account. */
export const accountSubdomain = 'sia-foundation.workers.dev'

// A preview URL's host is `<alias>-<worker>`. Cloudflare rejects the upload once that
// reaches 63 characters, the length of a DNS label, and wrangler never shortens an
// alias it is given. The longest worker name, explorer-zen, plus its dash leaves 49.
const maxAliasLength =
  62 - Math.max(...deployments.map((d) => d.worker.length + 1))

/**
 * The preview alias for a branch. An alias may hold only lowercase letters, digits and
 * dashes and has to start with a letter, so `fix/Thing_2` becomes `fix-thing-2` and
 * `2-fix` becomes `fix`.
 *
 * A branch too long to fit is cut and ends in a hash of its full name, so two long
 * branches that start the same still get separate previews instead of overwriting one.
 */
export function previewAlias(branch: string): string {
  const alias = branch
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[^a-z]+/, '')
    .replace(/-+$/, '')
  if (!alias) return 'preview'
  if (alias.length <= maxAliasLength) return alias
  const hash = createHash('sha256').update(branch).digest('hex').slice(0, 6)
  const kept = alias
    .slice(0, maxAliasLength - hash.length - 1)
    .replace(/-+$/, '')
  return `${kept}-${hash}`
}

export function previewUrl(alias: string, worker: string): string {
  return `https://${alias}-${worker}.${accountSubdomain}`
}

export function productionUrl(worker: string): string {
  return `https://${worker}.${accountSubdomain}`
}

/**
 * Whether changing these files, given relative to the repository root, can change how
 * every Worker is built or shipped. They belong to no Nx project, so Nx never counts
 * them as affecting an app.
 */
export function changesDeployTooling(files: string[]): boolean {
  return files.some(
    (file) =>
      (file.startsWith('scripts/cloudflare/') && !file.endsWith('.test.ts')) ||
      file === '.github/workflows/preview.yml' ||
      file === '.github/workflows/deploy.yml',
  )
}

/** Every deployment built from any of the given Nx projects. */
export function deploymentsFor(projects: string[]): Deployment[] {
  return deployments.filter((d) => projects.includes(d.project))
}
