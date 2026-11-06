import { test, expect, Route } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToContracts, navigateToHosts } from '../fixtures/navigate'
import {
  addHostsFilter,
  getHostdKeyPrefixes,
  showUnusableHosts,
  waitForHostRows,
} from '../fixtures/hosts'
import { confirmDialog, getRow, openRow, selectRow } from '../fixtures/table'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, { hostdCount: 2 })
})

test.afterEach(async () => {
  await afterTest()
})

test('list the cluster hosts', async ({ page }) => {
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  for (const key of getHostdKeyPrefixes()) {
    await expect(getRow(page, key)).toBeVisible()
  }
})

test('filter hosts by public key', async ({ page }) => {
  const [hostA, hostB] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  const publicKey = (
    await getRow(page, hostA).getByRole('cell').nth(1).innerText()
  ).trim()

  await addHostsFilter(page, 'public key')
  const dialog = page.getByRole('dialog', {
    name: 'Filter hosts by public key',
  })
  await fillTextInputByName(page, 'publicKey', publicKey)
  await dialog.getByRole('button', { name: 'Apply filter' }).click()
  await expect(getRow(page, hostA)).toBeVisible()
  await expect(getRow(page, hostB)).toBeHidden()
})

test('view host details', async ({ page }) => {
  const [host] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await openRow(page, host)
  await expect(page.getByText('Consecutive Failed Scans')).toBeVisible()
  await expect(page.getByText(/^localhost:\d+$/).first()).toBeVisible()
})

test('block and unblock a host', async ({ page }) => {
  const [host] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)

  // Block the host with a canned and a custom reason.
  await selectRow(page, host)
  await page.getByRole('button', { name: 'Block host', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Block host' })
  await dialog.getByText('poor uptime', { exact: true }).click()
  await dialog.locator('textarea[name="reason"]').fill('e2e reason')
  await dialog.getByRole('button', { name: 'Block host', exact: true }).click()
  await expect(page.getByText('Blocked 1 host')).toBeVisible()

  // The host is listed as blocked with its reasons.
  await addHostsFilter(page, 'blocked', 'Blocked')
  await page.keyboard.press('Escape')
  await waitForHostRows(page, 1)
  await openRow(page, host)
  // The reasons are shown in both the table and the side panel.
  await expect(
    page.getByText('poor uptime', { exact: true }).first(),
  ).toBeVisible()
  await expect(
    page.getByText('e2e reason', { exact: true }).first(),
  ).toBeVisible()

  // Unblock the host.
  await page.getByRole('button', { name: 'Close drawer' }).click()
  await selectRow(page, host)
  await page.getByRole('button', { name: 'Unblock host' }).click()
  await expect(page.getByText('Unblocked 1 host')).toBeVisible()
  // A table that has not loaded yet also has no rows, so wait for the empty
  // state of the blocked filter instead.
  await expect(async () => {
    await page.reload()
    await expect(page.getByText('No hosts matching filters.')).toBeVisible({
      timeout: 2_000,
    })
  }).toPass({ timeout: 30_000 })
})

test('scan a host from its side panel', async ({ page }) => {
  const [host] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await openRow(page, host)
  const response = page.waitForResponse(
    (r) => r.url().includes('/scan') && r.request().method() === 'POST',
  )
  await page.getByRole('button', { name: 'Scan host' }).click()

  // The cluster hosts announce private addresses, so the scan fails. indexd
  // still returns the updated host, and the panel shows the new count.
  const scanned = await (await response).json()
  const toast = page
    .getByRole('listitem')
    .filter({ hasText: 'Host scan failed' })
  await expect(toast).toContainText(
    `${scanned.consecutiveFailedScans} consecutive failed scans`,
  )
  await expect(
    page
      .locator('div.flex.gap-1')
      .filter({ hasText: 'Consecutive Failed Scans' }),
  ).toHaveText(`Consecutive Failed Scans${scanned.consecutiveFailedScans}`)

  // The toast links back to the host.
  await page.getByRole('button', { name: 'Close drawer' }).click()
  await toast.getByRole('link', { name: 'View host' }).click()
  await expect(page).toHaveURL(/hostsPanelId=/)
  await expect(
    page.getByText('Consecutive Failed Scans', { exact: true }),
  ).toBeVisible()
})

test('scan selected hosts', async ({ page }) => {
  const [hostA, hostB] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await selectRow(page, hostA)
  await selectRow(page, hostB)
  await page.getByRole('button', { name: 'Scan hosts (2)' }).click()

  // The cluster hosts are unreachable, so both scans fail.
  await expect(
    page
      .getByRole('listitem')
      .filter({ hasText: 'Scanned 2 hosts' })
      .filter({ hasText: '0 reachable, 2 failed.' }),
  ).toBeVisible()

  // The hosts stay selected and show the failed scan.
  await expect(page.getByText('Selected hosts (2)')).toBeVisible()
  for (const host of [hostA, hostB]) {
    await expect(getRow(page, host).getByRole('checkbox')).toBeChecked()
    await getRow(page, host)
      .getByRole('cell')
      .filter({ hasText: /\d+\/\d+\/\d+/ })
      .locator('svg')
      .hover()
    await expect(
      page.getByRole('tooltip').filter({ hasText: 'host scan failed' }),
    ).toBeVisible()
  }
})

test('link the only failed host after scanning selected hosts', async ({
  page,
}) => {
  const [hostA, hostB] = getHostdKeyPrefixes()
  // The cluster hosts are unreachable, so report host A's real scan as a
  // success to leave host B as the only failure.
  await page.route(`**/api/host/${hostA}*/scan`, async (route) => {
    const response = await fetchDecodable(route)
    await route.fulfill({
      response,
      json: { ...(await response.json()), consecutiveFailedScans: 0 },
    })
  })
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await selectRow(page, hostA)
  await selectRow(page, hostB)
  await page.getByRole('button', { name: 'Scan hosts (2)' }).click()

  const toast = page
    .getByRole('listitem')
    .filter({ hasText: '1 reachable, 1 failed.' })
  await toast.getByRole('link', { name: 'View host' }).click()
  await expect(page).toHaveURL(
    new RegExp(`hostsPanelId=${encodeURIComponent(hostB)}`),
  )
})

test('show hosts as scanning until their scans return', async ({ page }) => {
  const [hostA, hostB] = getHostdKeyPrefixes()
  // The cluster scans return almost instantly, so hold them open.
  let release: () => void = () => undefined
  const released = new Promise<void>((resolve) => {
    release = resolve
  })
  await page.route('**/api/host/*/scan', async (route) => {
    await released
    await route.continue()
  })
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await selectRow(page, hostA)
  await selectRow(page, hostB)
  await page.getByRole('button', { name: 'Scan hosts (2)' }).click()
  await expect(page.getByRole('button', { name: 'Scanning' })).toBeVisible()
  for (const host of [hostA, hostB]) {
    await expect(getRow(page, host)).toContainText('Scanning')
  }

  // The scans are tracked app-wide, so the host's own scan button shows them
  // after leaving the page and coming back.
  await navigateToContracts(page)
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await openRow(page, hostA)
  await expect(page.getByRole('button', { name: 'Scanning' })).toBeVisible()

  release()
  await expect(
    page.getByRole('listitem').filter({ hasText: 'Scanned 2 hosts' }),
  ).toBeVisible()
  await expect(page.getByRole('button', { name: 'Scan host' })).toBeVisible()
  await expect(getRow(page, hostA)).not.toContainText('Scanning')
})

test('show a successful host scan', async ({ page }) => {
  const [host] = getHostdKeyPrefixes()
  // The cluster hosts are unreachable, so report the scan and the refreshed
  // hosts list as successful.
  await page.route(`**/api/host/${host}*/scan`, async (route) => {
    const response = await fetchDecodable(route)
    await route.fulfill({
      response,
      json: { ...(await response.json()), consecutiveFailedScans: 0 },
    })
  })
  await page.route(
    (url) => url.pathname.endsWith('/api/hosts'),
    async (route) => {
      const response = await fetchDecodable(route)
      const hosts: { publicKey: string }[] = await response.json()
      await route.fulfill({
        response,
        json: hosts.map((h) =>
          h.publicKey.startsWith(host)
            ? {
                ...h,
                lastSuccessfulScan: new Date().toISOString(),
                lastFailedScan: '0001-01-01T00:00:00Z',
              }
            : h,
        ),
      })
    },
  )
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)
  await openRow(page, host)
  await page.getByRole('button', { name: 'Scan host' }).click()

  const toast = page
    .getByRole('listitem')
    .filter({ hasText: 'Host scan succeeded' })
  await expect(toast.getByRole('link', { name: 'View host' })).toBeVisible()
  await getRow(page, host)
    .getByRole('cell')
    .filter({ hasText: /\d+\/\d+\/\d+/ })
    .locator('svg')
    .hover()
  await expect(
    page.getByRole('tooltip').filter({ hasText: 'host scan succeeded' }),
  ).toBeVisible()
})

test('show an error when a host scan request fails', async ({ page }) => {
  const [hostA, hostB] = getHostdKeyPrefixes()
  await page.route(`**/api/host/${hostA}*/scan`, (route) =>
    route.fulfill({ status: 500, body: 'scan exploded' }),
  )
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 2)

  // A single host shows the error.
  await openRow(page, hostA)
  await page.getByRole('button', { name: 'Scan host' }).click()
  await expect(
    page
      .getByRole('listitem')
      .filter({ hasText: 'Failed to scan host' })
      .filter({ hasText: 'scan exploded' }),
  ).toBeVisible()
  // A failed request must not leave the host looking like it is scanning.
  await expect(page.getByRole('button', { name: 'Scan host' })).toBeVisible()
  await page.getByRole('button', { name: 'Close drawer' }).click()
  await expect(getRow(page, hostA)).not.toContainText('Scanning')

  // A bulk scan counts it separately from failed scans.
  await selectRow(page, hostA)
  await selectRow(page, hostB)
  await page.getByRole('button', { name: 'Scan hosts (2)' }).click()
  await expect(
    page
      .getByRole('listitem')
      .filter({ hasText: 'Scanned 2 hosts' })
      .filter({ hasText: '0 reachable, 1 failed, 1 error.' }),
  ).toBeVisible()
})

test('scan due hosts and all hosts', async ({ page }) => {
  await navigateToHosts(page)
  const scanRequest = () =>
    page.waitForRequest(
      (r) => r.url().includes('/api/hosts/scan') && r.method() === 'POST',
    )

  const due = scanRequest()
  await page.getByRole('button', { name: 'Scan due hosts' }).click()
  await expect(page.getByText('Scan of due hosts started')).toBeVisible()
  expect(new URL((await due).url()).searchParams.get('force')).toBe('false')

  const all = scanRequest()
  await page.getByRole('button', { name: 'Scan all hosts' }).click()
  await confirmDialog(page, 'Scan all hosts')
  await expect(page.getByText('Scan of all hosts started')).toBeVisible()
  expect(new URL((await all).url()).searchParams.get('force')).toBe('true')
})

// indexd answers Firefox's Accept-Encoding with zstd, which route.fetch hands
// back still encoded, so ask only for encodings it decodes.
function fetchDecodable(route: Route) {
  return route.fetch({
    headers: {
      ...route.request().headers(),
      'accept-encoding': 'gzip, deflate, br',
    },
  })
}
