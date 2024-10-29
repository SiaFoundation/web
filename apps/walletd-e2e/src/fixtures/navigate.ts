import { Page, expect } from '@playwright/test'
import { openWallet } from './wallet'
import { step } from '@siafoundation/e2e'

export const navigateToWallet = step(
  'navigate to wallet',
  async (page: Page, name: string) => {
    await page.getByLabel('Dashboard').click()
    await openWallet(page, name)
    await expect(page.getByTestId('navbar').getByText(name)).toBeVisible()
  }
)
