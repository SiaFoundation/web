import { Page, expect } from '@playwright/test'

export async function navigateToConfig({ page }: { page: Page }) {
  await page.getByLabel('Configuration').click()
  await expect(page.locator('#navbar').getByText('Configuration')).toBeVisible()
}
