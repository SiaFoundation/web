import { Page, expect } from '@playwright/test'
import { openWallet } from './wallet'
import { step } from '@siafoundation/e2e'

export const navigateToWalletsList = step(
  'navigate to wallets list',
  async (page: Page) => {
    const walletsNavVisible = await page
      .getByTestId('navbar')
      .getByText('Wallets', { exact: true })
      .isVisible()

    if (!walletsNavVisible) {
      await page.getByLabel('Dashboard').click()
    }

    await expect(
      page.getByTestId('navbar').getByText('Wallets', { exact: true }),
    ).toBeVisible()
  },
)

export const navigateToWallet = step(
  'navigate to wallet',
  async (page: Page, name: string) => {
    await navigateToWalletsList(page)
    await openWallet(page, name)
  },
)
