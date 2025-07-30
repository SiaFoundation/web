import { Page, expect } from '@playwright/test'
import { navigateToKeys } from './navigate'
import {
  getTextInputValueByName,
  maybeExpectAndReturn,
  step,
} from '@siafoundation/e2e'

export const getKeyRowById = step(
  'get key row by ID',
  async (page: Page, id: string, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('keysTable').getByTestId(id),
      shouldExpect,
    )
  },
)

export const getKeysSummaryRow = step(
  'get keys summary row',
  async (page: Page, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page.getByTestId('keysTable').locator('thead').getByRole('row').nth(1),
      shouldExpect,
    )
  },
)

export const getKeyRowByIndex = step(
  'get key row by index',
  async (page: Page, index: number, shouldExpect?: boolean) => {
    return maybeExpectAndReturn(
      page
        .getByTestId('keysTable')
        .locator('tbody')
        .getByRole('row')
        .nth(index),
      shouldExpect,
    )
  },
)

export const createKey = step(
  'create key',
  async (page: Page): Promise<string> => {
    await navigateToKeys({ page })
    await page.getByTestId('navbar').getByText('Create keypair').click()
    const dialog = page.getByRole('dialog')
    const accessKeyId = await getTextInputValueByName(page, 'name')
    await dialog.getByRole('button', { name: 'Create' }).click()
    await getKeyRowById(page, accessKeyId, true)
    await expect(dialog).toBeHidden()
    return accessKeyId
  },
)

export const openKeyContextMenu = step(
  'open key context menu',
  async (page: Page, key: string) => {
    const selector = page.getByTestId(key).getByLabel('key context menu')
    await expect(selector).toBeVisible()
    await selector.click()
  },
)
