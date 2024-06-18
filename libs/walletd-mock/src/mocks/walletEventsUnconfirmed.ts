import {
  WalletEventsUnconfirmedResponse,
  walletsIdEventsUnconfirmedRoute,
} from '@siafoundation/walletd-types'
import { Page } from 'playwright'

export function getMockWalletEventsUnconfirmedResponse(): WalletEventsUnconfirmedResponse {
  return []
}

export async function mockApiWalletEventsUnconfirmed({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = getMockWalletEventsUnconfirmedResponse()
  await page.route(
    `**/api${walletsIdEventsUnconfirmedRoute.replace(':id', walletId)}**`,
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}
