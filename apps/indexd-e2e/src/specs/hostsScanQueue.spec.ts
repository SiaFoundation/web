import { test, expect } from '@playwright/test'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToHosts } from '../fixtures/navigate'
import {
  getHostdKeyPrefixes,
  showUnusableHosts,
  waitForHostRows,
} from '../fixtures/hosts'
import { getRow, selectRow } from '../fixtures/table'

// This needs more hosts than the concurrency limit, the rest of the hosts
// specs use 2.
test.beforeEach(async ({ page }) => {
  await beforeTest(page, { hostdCount: 4 })
})

test.afterEach(async () => {
  await afterTest()
})

test('scan selected hosts at most 3 at a time', async ({ page }) => {
  const hosts = getHostdKeyPrefixes()
  // Hold each scan open until it is released.
  let started = 0
  const releases: (() => void)[] = []
  await page.route('**/api/host/*/scan', async (route) => {
    started++
    await new Promise<void>((resolve) => releases.push(resolve))
    await route.continue()
  })
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 4)
  for (const host of hosts) {
    await selectRow(page, host)
  }
  await page.getByRole('button', { name: 'Scan hosts (4)' }).click()

  // Queued hosts show as scanning too.
  for (const host of hosts) {
    await expect(getRow(page, host)).toContainText('Scanning')
  }
  await expect.poll(() => started).toBe(3)

  // The fourth scan starts once one of the first three returns.
  releases[0]()
  await expect.poll(() => started).toBe(4)
  for (const release of releases) {
    release()
  }
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Scanned 4 hosts' }),
  ).toBeVisible()
})
