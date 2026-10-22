import { describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { planRewrites, prepareStaticSite } from './static-site'

describe('planRewrites', () => {
  test('a site without dynamic pages needs no rewrites', () => {
    expect(
      planRewrites(['404.html', 'index.html', 'login.html', 'volumes.html']),
    ).toEqual([])
  })

  test('walletd: a nested page under a parameter is matched before the parameter page', () => {
    expect(
      planRewrites([
        '404.html',
        'index.html',
        'login.html',
        'node.html',
        'wallets/[id].html',
        'wallets/[id]/addresses.html',
      ]),
    ).toEqual([
      {
        pattern: '/wallets/:id/addresses',
        target: '/wallets/%5Bid%5D/addresses',
      },
      { pattern: '/wallets/:id', target: '/wallets/%5Bid%5D' },
    ])
  })

  test('renterd: an optional catch-all answers both with and without trailing segments', () => {
    const files = '/buckets/%5Bbucket%5D/files/%5B%5B...path%5D%5D'
    expect(
      planRewrites([
        'buckets.html',
        'buckets/[bucket]/files/[[...path]].html',
        'buckets/[bucket]/uploads.html',
        'index.html',
      ]),
    ).toEqual([
      { pattern: '/buckets/:bucket/files', target: files },
      {
        pattern: '/buckets/:bucket/uploads',
        target: '/buckets/%5Bbucket%5D/uploads',
      },
      { pattern: '/buckets/:bucket/files/*', target: files },
    ])
  })

  test('refuses a dynamic page whose rewrite would catch a real page beside it', () => {
    expect(() =>
      planRewrites(['wallets/[id].html', 'wallets/new.html']),
    ).toThrow('/wallets/:id would also catch the page at /wallets/new')
  })

  test('a real page one level up from a dynamic page is not caught', () => {
    expect(() =>
      planRewrites([
        'buckets.html',
        'index.html',
        'buckets/[bucket]/files/[[...path]].html',
      ]),
    ).not.toThrow()
  })

  test('a required catch-all needs at least one segment', () => {
    expect(planRewrites(['docs/[...slug].html'])).toEqual([
      { pattern: '/docs/*', target: '/docs/%5B...slug%5D' },
    ])
  })
})

describe('prepareStaticSite', () => {
  function site(files: Record<string, string>) {
    const root = mkdtempSync(join(tmpdir(), 'static-site-'))
    for (const [path, body] of Object.entries(files)) {
      mkdirSync(join(root, path, '..'), { recursive: true })
      writeFileSync(join(root, path), body)
    }
    return root
  }

  test('writes the rules, and a second run changes nothing', () => {
    const root = site({
      'index.html': 'home',
      'wallets/[id].html': 'wallet page',
    })
    prepareStaticSite(root)
    const redirects = readFileSync(join(root, '_redirects'), 'utf8')
    const headers = readFileSync(join(root, '_headers'), 'utf8')
    prepareStaticSite(root)

    expect(redirects).toContain('/wallets/:id /wallets/%5Bid%5D 200\n')
    expect(headers).toContain('/_next/static/*\n')
    expect(readFileSync(join(root, '_redirects'), 'utf8')).toBe(redirects)
    expect(readFileSync(join(root, '_headers'), 'utf8')).toBe(headers)
  })

  test("leaves an app's own _redirects alone", () => {
    const root = site({ 'index.html': 'home', _redirects: '/old /new 301\n' })
    expect(() => prepareStaticSite(root)).toThrow('was not generated here')
  })
})
