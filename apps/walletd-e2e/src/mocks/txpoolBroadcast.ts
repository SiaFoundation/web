import { Page } from 'playwright'

export async function mockApiTxpoolBroadcast({ page }: { page: Page }) {
  await page.route(`**/api/txpool/broadcast*`, async (route) => {
    await route.fulfill()
  })
}
