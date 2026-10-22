import { describe, expect, test } from 'bun:test'
import {
  changesDeployTooling,
  deployments,
  deploymentsFor,
  previewAlias,
  previewUrl,
} from './deployments'

describe('previewAlias', () => {
  test('turns a branch into lowercase letters, digits and dashes', () => {
    expect(previewAlias('fix/cloudflare-workers')).toBe(
      'fix-cloudflare-workers',
    )
    expect(previewAlias('Feature/Some_Thing!!')).toBe('feature-some-thing')
    expect(previewAlias('dependabot/bun/dependencies-3d2a9ce63c')).toBe(
      'dependabot-bun-dependencies-3d2a9ce63c',
    )
  })

  test('starts with a letter', () => {
    expect(previewAlias('2-fix')).toBe('fix')
    expect(previewAlias('_/fix/thing')).toBe('fix-thing')
  })

  test('keeps a branch of 49 characters whole', () => {
    expect(previewAlias('a'.repeat(49))).toBe('a'.repeat(49))
  })

  test('cuts a longer branch to 49 characters, ending in a hash of the full name', () => {
    const alias = previewAlias(`${'a'.repeat(48)}/rest-of-the-branch-name`)
    expect(alias).toHaveLength(49)
    expect(alias).toMatch(/^a{42}-[0-9a-f]{6}$/)
  })

  test('two long branches that start the same get different aliases', () => {
    const prefix = `fix/${'long-'.repeat(12)}`
    expect(previewAlias(`${prefix}one`)).not.toBe(previewAlias(`${prefix}two`))
  })

  test('falls back when nothing usable is left', () => {
    expect(previewAlias('///')).toBe('preview')
    expect(previewAlias('123')).toBe('preview')
  })

  test("every Worker's preview host stays under 63 characters at the longest alias", () => {
    const alias = previewAlias('x'.repeat(200))
    for (const { worker } of deployments) {
      const host = new URL(previewUrl(alias, worker)).hostname.split('.')[0]
      expect(host.length).toBeLessThan(63)
    }
  })
})

describe('deploymentsFor', () => {
  test('a change to explorer previews both networks', () => {
    expect(deploymentsFor(['explorer']).map((d) => d.worker)).toEqual([
      'explorer',
      'explorer-zen',
    ])
  })

  test('a change to the deploy script or workflows counts for every app, but its tests do not', () => {
    expect(changesDeployTooling(['scripts/cloudflare/static-site.ts'])).toBe(
      true,
    )
    expect(changesDeployTooling(['.github/workflows/deploy.yml'])).toBe(true)
    expect(
      changesDeployTooling([
        'scripts/cloudflare/static-site.test.ts',
        'apps/hostd/pages/index.tsx',
        '.github/workflows/pr.yml',
      ]),
    ).toBe(false)
  })

  test('a project with no Worker previews nothing', () => {
    expect(deploymentsFor(['design-system'])).toEqual([])
  })
})
