import { WalletTxPoolResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletTxPoolResponse(): WalletTxPoolResponse {
  return []
}

export async function mockApiWalletTxPool({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = getMockWalletTxPoolResponse()
  await page.route(`**/api/wallets/${walletId}/txpool*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
