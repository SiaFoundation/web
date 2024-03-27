import { WalletEvent } from '@siafoundation/react-walletd'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: WalletEvent[] = []

export async function mockApiWalletEvents({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = cloneDeep(data)
  await page.route(`**/api/wallets/${walletId}/events*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
