import { Page, expect } from '@playwright/test'

export async function navigateToDashboard({ page }: { page: Page }) {
  await page.getByLabel('Overview').click()
  await expect(page.locator('#navbar').getByText('Overview')).toBeVisible()
}