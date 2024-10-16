import { Page, expect } from '@playwright/test'
import { navigateToKeys } from './navigate'
import { getTextInputValueByName } from '@siafoundation/e2e'

export function getKeyRowById(page: Page, id: string) {
  return page.getByTestId('keysTable').getByTestId(id)
}

export function getKeysSummaryRow(page: Page) {
  return page.getByTestId('keysTable').locator('thead').getByRole('row').nth(1)
}

export function getKeyRowByIndex(page: Page, index: number) {
  return page
    .getByTestId('keysTable')
    .locator('tbody')
    .getByRole('row')
    .nth(index)
}

export async function getKeyRows(page: Page) {
  return page.getByTestId('keysTable').locator('tbody').getByRole('row').all()
}

export async function createKey(page: Page): Promise<string> {
  await navigateToKeys({ page })
  await page.getByTestId('navbar').getByText('Create keypair').click()
  const dialog = page.getByRole('dialog')
  const accessKeyId = await getTextInputValueByName(page, 'name')
  await dialog.getByRole('button', { name: 'Create' }).click()
  const row = getKeyRowById(page, accessKeyId)
  await expect(dialog).toBeHidden()
  await expect(row).toBeVisible()
  return accessKeyId
}

export async function openKeyContextMenu(page: Page, key: string) {
  const selector = page.getByTestId(key).getByLabel('key context menu')
  await expect(selector).toBeVisible()
  await selector.click()
}
