import { SiafundElement } from '@siafoundation/types'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: SiafundElement[] = []

export async function mockApiWalletOutputsSiafund({
  page,
  walletId,
}: {
  page: Page
  walletId: string
}) {
  const json = cloneDeep(data)
  await page.route(
    `**/api/wallets/${walletId}/outputs/siafund*`,
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}
