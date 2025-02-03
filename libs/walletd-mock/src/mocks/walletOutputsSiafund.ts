import { WalletOutputsSiafundResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletOutputsSiafundResponse(): WalletOutputsSiafundResponse {
  return {
    basis: {
      id: 'aa3e781330c9b3991e0141807df1327fadf114ca6c37acb9e58004f942d91dfb',
      height: 1000000,
    },
    outputs: [],
  }
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
