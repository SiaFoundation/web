import { test, expect } from '@playwright/test'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToHosts } from '../fixtures/navigate'
import {
  addHostsFilter,
  getHostdKeyPrefixes,
  showUnusableHosts,
  waitForHostRows,
} from '../fixtures/hosts'
import { getRow, openRow, selectRow } from '../fixtures/table'

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
