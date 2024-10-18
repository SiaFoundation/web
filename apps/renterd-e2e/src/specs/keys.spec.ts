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
  const row = getKeyRowById(page, key)
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
  const row1 = getKeyRowById(page, key1)
  const row2 = getKeyRowById(page, key2)
  const row3 = getKeyRowById(page, key3)

  // There are 4 keys total. Get the first and last row.
  const rowIdx0 = getKeyRowByIndex(page, 0)
  const rowIdx3 = getKeyRowByIndex(page, 3)

  // Select all 4 keys.
  await rowIdx0.click()
  await rowIdx3.click({ modifiers: ['Shift'] })

  // Delete all 4 keys.
  const menu = page.getByLabel('key multiselect menu')
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
