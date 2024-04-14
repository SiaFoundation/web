import { WalletReleaseResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export async function mockApiWalletRelease({
  page,
  walletId,
}: {
  page: Page
  walletId: string
  response?: WalletReleaseResponse
}) {
  await page.route(`**/api/wallets/${walletId}/release*`, async (route) => {
    await route.fulfill()
  })
}
