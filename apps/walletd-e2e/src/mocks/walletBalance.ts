import { WalletBalanceResponse } from '@siafoundation/react-walletd'
import { toHastings } from '@siafoundation/units'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: WalletBalanceResponse = {
  siacoins: toHastings('100').toString(),
  immatureSiacoins: toHastings('10').toString(),
  siafunds: 10,
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
  const json = response || cloneDeep(data)
  await page.route(`**/api/wallets/${walletId}/balance*`, async (route) => {
    await route.fulfill({ json })
  })
  return json
}
