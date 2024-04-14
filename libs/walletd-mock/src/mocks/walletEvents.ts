import { WalletEventsResponse } from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletEventsResponse(): WalletEventsResponse {
  return []
}

export async function mockApiWalletEvents({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = getMockWalletEventsResponse()
  await page.route(`**/api/wallets/${walletId}/events*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
