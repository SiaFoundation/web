import { Page, expect } from '@playwright/test'

export async function navigateToBuckets({ page }: { page: Page }) {
  await page.getByLabel('Files').click()
  await expect(page.locator('#navbar').getByText('Buckets')).toBeVisible()
}
