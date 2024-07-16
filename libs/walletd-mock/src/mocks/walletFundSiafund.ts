import type { WalletFundSiafundResponse } from '@siafoundation/walletd-types'
import type { Page } from 'playwright'

export function getMockWalletFundSiafundResponse(): WalletFundSiafundResponse {
  return {
    transaction: {
      minerFees: ['3930000000000000000000'],
    },
    toSign: [],
    dependsOn: null,
  }
}

export async function mockApiWalletFundSiafund({
  page,
  walletId,
  response,
  expectPost,
}: {
  page: Page
  walletId: string
  response?: WalletFundSiafundResponse
  expectPost?: (data: string | null) => void
}) {
  const json = response || getMockWalletFundSiafundResponse()
  await page.route(`**/api/wallets/${walletId}/fundsf*`, async (route) => {
    if (expectPost) {
      expectPost(route.request().postData())
    }
    await route.fulfill({ json })
  })
  return json
}
