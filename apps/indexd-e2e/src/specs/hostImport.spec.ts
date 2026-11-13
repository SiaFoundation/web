import { test, expect, Page } from '@playwright/test'
import { randomBytes } from 'crypto'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToHosts } from '../fixtures/navigate'
import {
  getHostdKeyPrefixes,
  showUnusableHosts,
  waitForHostRows,
} from '../fixtures/hosts'
import { getRow, openRow } from '../fixtures/table'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, { hostdCount: 1 })
})

test.afterEach(async () => {
  await afterTest()
})

test('add a host', async ({ page }) => {
  const publicKey = `ed25519:${randomBytes(32).toString('hex')}`
  await navigateToHosts(page)
  const dialog = await openAddHostDialog(page)
  await fillTextInputByName(page, 'publicKey', publicKey)
  await fillTextInputByName(page, 'siamuxAddress', 'imported.invalid:9984')
  await dialog.getByRole('button', { name: 'Add host' }).click()

  await expect(
    page.getByText('It will be scanned within a few minutes.'),
  ).toBeVisible()
  // The new host's side panel opens.
  await expect(page.getByText('imported.invalid:9984').first()).toBeVisible()

  // The host is not usable until a scan succeeds, so it is only listed once
  // unusable hosts are shown.
  await page.getByRole('button', { name: 'Close drawer' }).click()
  await showUnusableHosts(page)
  await expect(getRow(page, publicKey)).toBeVisible()
})

test('replace the addresses of a known host', async ({ page }) => {
  const [host] = getHostdKeyPrefixes()
  await navigateToHosts(page)
  await showUnusableHosts(page)
  await waitForHostRows(page, 1)
  const publicKey = (
    await getRow(page, host).getByRole('cell').nth(1).innerText()
  ).trim()

  const dialog = await openAddHostDialog(page)
  await fillTextInputByName(page, 'publicKey', publicKey)
  await fillTextInputByName(page, 'quicAddress', 'replaced.invalid:9984')
  await dialog.getByRole('button', { name: 'Add host' }).click()
  await expect(page.getByText('Host added')).toBeVisible()

  await openRow(page, host)
  await expect(page.getByText('replaced.invalid:9984').first()).toBeVisible()
  await expect(page.getByText(/^localhost:\d+$/)).toBeHidden()
})

test('validate the host to add', async ({ page }) => {
  await navigateToHosts(page)
  const dialog = await openAddHostDialog(page)
  await fillTextInputByName(page, 'publicKey', 'not a key')
  await fillTextInputByName(page, 'siamuxAddress', 'no-port')
  await expect(dialog.getByText('must be an ed25519 public key')).toBeVisible()
  const addressError = dialog.getByText(
    'must be host:port, with IPv6 in brackets',
  )
  await expect(addressError).toBeVisible()

  // indexd rejects IPv6 addresses without brackets.
  await fillTextInputByName(page, 'siamuxAddress', '2001:db8::1:9984')
  await expect(addressError).toBeVisible()
  await fillTextInputByName(page, 'siamuxAddress', '[2001:db8::1]:9984')
  await expect(addressError).toBeHidden()

  await fillTextInputByName(page, 'siamuxAddress', '')
  await expect(
    dialog.getByText('enter a SiaMux or QUIC address').first(),
  ).toBeVisible()
})

test('show an error when adding a host fails', async ({ page }) => {
  await page.route(
    (url) => url.pathname.endsWith('/api/hosts'),
    async (route) => {
      if (route.request().method() !== 'POST') {
        return route.fallback()
      }
      return route.fulfill({ status: 400, body: 'invalid address' })
    },
  )
  await navigateToHosts(page)
  const dialog = await openAddHostDialog(page)
  await fillTextInputByName(
    page,
    'publicKey',
    `ed25519:${randomBytes(32).toString('hex')}`,
  )
  await fillTextInputByName(page, 'siamuxAddress', 'imported.invalid:9984')
  await dialog.getByRole('button', { name: 'Add host' }).click()
  await expect(page.getByText('Failed to add host')).toBeVisible()
  await expect(page.getByText('invalid address')).toBeVisible()
  // The dialog stays open so the input can be corrected.
  await expect(dialog).toBeVisible()
})

async function openAddHostDialog(page: Page) {
  await page.getByRole('button', { name: 'Add host' }).click()
  const dialog = page.getByRole('dialog', { name: 'Add host' })
  await expect(dialog).toBeVisible()
  return dialog
}
