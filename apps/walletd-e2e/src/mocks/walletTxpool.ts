import { PoolTransaction } from '@siafoundation/react-walletd'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: PoolTransaction[] = []

export async function mockApiWalletTxpool({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = cloneDeep(data)
  await page.route(`**/api/wallets/${walletId}/txpool*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
