import { Locator, Page, expect } from '@playwright/test'
import { step } from '@siafoundation/e2e'

export function getRow(page: Page, text: string): Locator {
  return page.getByRole('table').getByRole('row').filter({ hasText: text })
}

export const selectRow = step(
  'select row',
  async (page: Page, text: string) => {
    await getRow(page, text).getByRole('checkbox').click()
    await expect(page.getByText(/^Selected \w+ \(\d+\)$/)).toBeVisible()
  },
)

// Opens the side panel for a row. The first cell is the selection checkbox
// and the second holds a copy button, so click a plain data cell.
export const openRow = step('open row', async (page: Page, text: string) => {
  await getRow(page, text).getByRole('cell').nth(2).click()
  await expect(page.getByRole('button', { name: 'Close drawer' })).toBeVisible()
})

// The loaded side panel is a form, while its loading skeleton is not, so this
// only resolves once the panel's data and actions are rendered.
export function getSidePanel(page: Page): Locator {
  return page
    .getByRole('button', { name: 'Close drawer' })
    .locator('xpath=ancestor::form')
}

export const closeSidePanel = step('close side panel', async (page: Page) => {
  await page.getByRole('button', { name: 'Close drawer' }).click()
  await expect(page.getByRole('button', { name: 'Close drawer' })).toBeHidden()
})

// The side panel is a form, so pressing Enter in a field saves it.
export const saveSidePanel = step(
  'save side panel',
  async (page: Page, fieldName: string) => {
    await page.locator(`input[name=${fieldName}]`).press('Enter')
  },
)

export const confirmDialog = step(
  'confirm dialog',
  async (page: Page, action: string) => {
    const dialog = page.getByRole('dialog')
    await dialog.getByRole('button', { name: action, exact: true }).click()
    await expect(dialog).toBeHidden()
  },
)
