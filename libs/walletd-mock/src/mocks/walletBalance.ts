import { WalletBalanceResponse } from '@siafoundation/walletd-types'
import { toHastings } from '@siafoundation/units'
import { Page } from 'playwright'

export function getMockWalletBalanceResponse(): WalletBalanceResponse {
  return {
    siacoins: toHastings('100').toString(),
    immatureSiacoins: toHastings('10').toString(),
    siafunds: 10,
  }
}

export async function mockApiWalletBalance({
  page,
  walletId,
  response,
}: {
  page: Page
  walletId: string
  response?: WalletBalanceResponse
}) {
  const json = response || getMockWalletBalanceResponse()
  await page.route(`**/api/wallets/${walletId}/balance*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
