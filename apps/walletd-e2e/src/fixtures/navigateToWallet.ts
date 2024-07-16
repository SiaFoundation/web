import { type Page, expect } from '@playwright/test'
import { openWallet } from './wallet'

export async function navigateToWallet(page: Page, name: string) {
  await page.getByLabel('Dashboard').click()
  await openWallet(page, name)
  await expect(page.getByTestId('navbar').getByText(name)).toBeVisible()
}
