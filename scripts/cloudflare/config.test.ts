import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { deployments } from './deployments'

const root = resolve(import.meta.dir, '../..')

type WranglerConfig = {
  name: string
  account_id?: string
  main?: string
  workers_dev: boolean
  preview_urls: boolean
  r2_buckets?: R2Binding[]
  assets: { directory: string }
  env?: Record<string, { r2_buckets?: R2Binding[] }>
}

type R2Binding = { binding: string; bucket_name: string }

async function wranglerConfig(project: string): Promise<WranglerConfig> {
  return (await import(join(root, 'apps', project, 'wrangler.jsonc'))).default
}

async function exportDirectory(project: string): Promise<string> {
  const config = (await import(join(root, 'apps', project, 'project.json')))
    .default
  return config.targets.build.configurations.export.outputPath
}

describe('wrangler.jsonc', () => {
  test('every app with a Worker config has a deployment, and the reverse', () => {
    const withConfig = readdirSync(join(root, 'apps')).filter((app) =>
      existsSync(join(root, 'apps', app, 'wrangler.jsonc')),
    )
    expect(withConfig.sort()).toEqual(
      [...new Set(deployments.map((d) => d.project))].sort(),
    )
  })

  // The account comes from CLOUDFLARE_ACCOUNT_ID, a repository secret, because this
  // repository is public.
  test('no Worker config names a Cloudflare account', async () => {
    for (const d of deployments) {
      expect((await wranglerConfig(d.project)).account_id).toBeUndefined()
    }
  })

  for (const d of deployments) {
    test(`${d.worker} has the name the deployment table gives it, with workers.dev and preview URLs on`, async () => {
      const config = await wranglerConfig(d.project)
      if (d.env) {
        expect(config.env).toHaveProperty(d.env)
        expect(`${config.name}-${d.env}`).toBe(d.worker)
      } else {
        expect(config.name).toBe(d.worker)
      }
      expect(config.workers_dev).toBe(true)
      expect(config.preview_urls).toBe(true)
    })
  }

  for (const d of deployments.filter((d) => d.env)) {
    test(`${d.worker} binds the same buckets as the Worker its environment comes from`, async () => {
      // Wrangler does not carry bindings into an environment, so each one is listed
      // again, and a bucket added to one list alone would be missing from the other.
      const config = await wranglerConfig(d.project)
      expect(config.env?.[d.env!]?.r2_buckets ?? []).toEqual(
        config.r2_buckets ?? [],
      )
    })
  }

  for (const d of deployments.filter((d) => d.kind === 'static')) {
    test(`${d.worker} serves its app's Nx export with no Worker script`, async () => {
      const config = await wranglerConfig(d.project)
      expect(config.main).toBeUndefined()
      expect(resolve(root, 'apps', d.project, config.assets.directory)).toBe(
        resolve(root, await exportDirectory(d.project), '.next'),
      )
    })
  }
})
