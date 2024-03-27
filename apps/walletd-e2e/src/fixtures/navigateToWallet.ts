import { Page } from '@playwright/test'
import { Wallet } from '@siafoundation/react-walletd'

export async function navigateToWallet({
  page,
  wallet,
}: {
  page: Page
  wallet: Wallet
}) {
  await page.getByLabel('Dashboard').click()
  await page.getByText(wallet.name).click()
}
