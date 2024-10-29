import { test, expect } from '@playwright/test'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  createKey,
  getKeyRowById,
  getKeyRowByIndex,
  openKeyContextMenu,
} from '../fixtures/keys'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('create and delete a key', async ({ page }) => {
  const key = await createKey(page)
  const row = await getKeyRowById(page, key, true)
  await openKeyContextMenu(page, key)
  await page.getByRole('menu').getByText('Delete').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Delete' }).click()
  await expect(row).toBeHidden()
})

test('batch delete multiple keys', async ({ page }) => {
  // Create 3 keys. Note: 1 already exists.
  const key1 = await createKey(page)
  const key2 = await createKey(page)
  const key3 = await createKey(page)
  const row1 = await getKeyRowById(page, key1, true)
  const row2 = await getKeyRowById(page, key2, true)
  const row3 = await getKeyRowById(page, key3, true)

  // There are 4 keys total. Get the first and last row.
  const rowIdx0 = await getKeyRowByIndex(page, 0, true)
  const rowIdx3 = await getKeyRowByIndex(page, 3, true)

  // Select all 4 keys.
  await rowIdx0.click()
  await rowIdx3.click({ modifiers: ['Shift'] })

  // Delete all 4 keys.
  const menu = page.getByLabel('key multi-select menu')
  await menu.getByLabel('delete selected keys').click()
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Delete' }).click()
  await expect(row1).toBeHidden()
  await expect(row2).toBeHidden()
  await expect(row3).toBeHidden()
  await expect(
    page.getByText('There are no S3 authentication keypairs yet.')
  ).toBeVisible()
})
