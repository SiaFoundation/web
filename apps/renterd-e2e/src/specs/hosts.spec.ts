import { test, expect } from '@playwright/test'
import { navigateToHosts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  getHostRowByIndex,
  getHostRows,
  getHostRowsAll,
  openManageListsDialog,
} from '../fixtures/hosts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('hosts explorer shows all hosts', async ({ page }) => {
  await navigateToHosts({ page })

  const row1 = await getHostRowByIndex(page, 0)
  const row2 = await getHostRowByIndex(page, 1)
  const row3 = await getHostRowByIndex(page, 2)
  await expect(row1).toBeVisible()
  await expect(row2).toBeVisible()
  await expect(row3).toBeVisible()
})

test('hosts bulk allowlist', async ({ page }) => {
  await navigateToHosts({ page })
  const rows = await getHostRowsAll(page)
  // Range select the rows, add position as default location is a context menu button.
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'], position: { x: 5, y: 5 } })

  const menu = page.getByLabel('host multi-select menu')
  const dialog = page.getByRole('dialog')

  // Add selected hosts to the allowlist.
  await menu.getByLabel('add host public keys to allowlist').click()
  await dialog.getByRole('button', { name: 'Add to allowlist' }).click()

  await openManageListsDialog(page)
  await expect(dialog.getByText('The blocklist is empty')).toBeVisible()
  await dialog.getByLabel('view allowlist').click()
  await expect(
    dialog.getByTestId('allowlistPublicKeys').getByTestId('item')
  ).toHaveCount(3)
  await dialog.getByLabel('close').click()
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('blocked')
  ).toHaveCount(0)
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('allowed')
  ).toHaveCount(3)

  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'], position: { x: 5, y: 5 } })

  // Remove selected hosts from the allowlist.
  await menu.getByLabel('remove host public keys from allowlist').click()
  await dialog.getByRole('button', { name: 'Remove from allowlist' }).click()

  await openManageListsDialog(page)
  await expect(dialog.getByText('The blocklist is empty')).toBeVisible()
  await dialog.getByLabel('view allowlist').click()
  await expect(dialog.getByText('The allowlist is empty')).toBeVisible()
  await dialog.getByLabel('close').click()
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('blocked')
  ).toHaveCount(0)
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('allowed')
  ).toHaveCount(3)
})

test('hosts bulk rescan', async ({ page }) => {
  await navigateToHosts({ page })
  const rows = await getHostRowsAll(page)
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'], position: { x: 5, y: 5 } })

  // Rescan selected hosts.
  const menu = page.getByLabel('host multi-select menu')
  await menu.getByLabel('rescan selected hosts').click()
  await expect(page.getByText('rescanning 3 hosts')).toBeVisible()
})

test('hosts bulk blocklist', async ({ page }) => {
  await navigateToHosts({ page })
  const rows = await getHostRowsAll(page)
  // Range select the rows, add position as default location is a context menu button.
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'], position: { x: 5, y: 5 } })

  const menu = page.getByLabel('host multi-select menu')
  const dialog = page.getByRole('dialog')

  // Add selected hosts to the allowlist.
  await menu.getByLabel('add host addresses to blocklist').click()
  await dialog.getByRole('button', { name: 'Add to blocklist' }).click()

  await openManageListsDialog(page)
  await expect(
    dialog.getByTestId('blocklistAddresses').getByTestId('item')
  ).toHaveCount(3)
  await dialog.getByLabel('view allowlist').click()
  await expect(dialog.getByText('The allowlist is empty')).toBeVisible()
  await dialog.getByLabel('close').click()
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('blocked')
  ).toHaveCount(3)
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('allowed')
  ).toHaveCount(0)

  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(-1).click({ modifiers: ['Shift'], position: { x: 5, y: 5 } })

  // Remove selected hosts from the blocklist.
  await menu.getByLabel('remove host addresses from blocklist').click()
  await dialog.getByRole('button', { name: 'Remove from blocklist' }).click()

  await openManageListsDialog(page)
  await expect(dialog.getByText('The blocklist is empty')).toBeVisible()
  await dialog.getByLabel('view allowlist').click()
  await expect(dialog.getByText('The allowlist is empty')).toBeVisible()
  await dialog.getByLabel('close').click()
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('blocked')
  ).toHaveCount(0)
  await expect(
    getHostRows(page).getByTestId('allow').getByTestId('allowed')
  ).toHaveCount(3)
})
