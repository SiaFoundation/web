import { Page, expect } from '@playwright/test'
import { clearToasts, step } from '@siafoundation/e2e'
import { getRow } from './table'

export type QuotaValues = {
  key: string
  description: string
  maxPinnedDataGB: string
  totalUses: string
  fundTargetGB: string
}

export const e2eQuota: QuotaValues = {
  key: 'e2e-quota',
  description: 'E2E quota',
  maxPinnedDataGB: '50',
  totalUses: '7',
  fundTargetGB: '2',
}

export const createQuota = step(
  'create quota',
  async (page: Page, values: QuotaValues) => {
    await clearToasts({ page })
    await page.getByRole('button', { name: 'Create quota' }).click()
    // Scope to the dialog, an open side panel has the same field names.
    const dialog = page.getByRole('dialog', { name: 'Create quota' })
    for (const name of [
      'key',
      'description',
      'maxPinnedDataGB',
      'totalUses',
      'fundTargetGB',
    ] as const) {
      await dialog.locator(`input[name="${name}"]`).fill(values[name])
    }
    await dialog.getByRole('button', { name: 'Create quota' }).click()
    await expect(page.getByText('Quota created')).toBeVisible()
    await expect(getRow(page, values.key)).toBeVisible()
    // The new quota opens in the side panel.
    await expect(page.locator('input[name="description"]')).toHaveValue(
      values.description,
    )
  },
)
