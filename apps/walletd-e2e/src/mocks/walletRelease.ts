import { WalletFundResponse } from '@siafoundation/react-walletd'
import { Page } from 'playwright'

export async function mockApiWalletRelease({
  page,
  walletId,
}: {
  page: Page
  walletId: string
  response?: WalletFundResponse
}) {
  await page.route(`**/api/wallets/${walletId}/release*`, async (route) => {
    await route.fulfill()
  })
}
