import { WalletFundSiafundResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletFundSiafundResponse(): WalletFundSiafundResponse {
  return {
    basis: {
      id: '0',
      height: 100000,
    },
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
