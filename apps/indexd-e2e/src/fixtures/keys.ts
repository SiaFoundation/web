import { Page, expect } from '@playwright/test'
import { clearToasts, step } from '@siafoundation/e2e'
import { getRow } from './table'

export const createKey = step(
  'create connect key',
  async (
    page: Page,
    { description, quota }: { description: string; quota: string },
  ) => {
    await clearToasts({ page })
    await page.getByRole('button', { name: 'Create key' }).click()
    // Scope to the dialog, an open side panel has the same field names.
    const dialog = page.getByRole('dialog', { name: 'Create connect key' })
    await dialog.locator('input[name="description"]').fill(description)
    await dialog.locator('select[name="quota"]').selectOption(quota)
    await dialog.getByRole('button', { name: 'Create connect key' }).click()
    await expect(page.getByText('Connect key created')).toBeVisible()
    await expect(getRow(page, description)).toBeVisible()
    // The new key opens in the side panel.
    await expect(page.locator('input[name="description"]')).toHaveValue(
      description,
    )
  },
)
