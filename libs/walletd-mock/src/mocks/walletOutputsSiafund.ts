import { WalletOutputsSiafundResponse } from '@siafoundation/walletd-react'
import { Page } from 'playwright'

export function getMockWalletOutputsSiafundResponse(): WalletOutputsSiafundResponse {
  return []
}

export async function mockApiWalletOutputsSiafund({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = getMockWalletOutputsSiafundResponse()
  await page.route(
    `**/api/wallets/${walletId}/outputs/siafund*`,
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}
