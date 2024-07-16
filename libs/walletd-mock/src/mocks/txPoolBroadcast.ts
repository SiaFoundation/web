import type { Page } from 'playwright'

export async function mockApiTxPoolBroadcast({ page }: { page: Page }) {
  await page.route(`**/api/txpool/broadcast*`, async (route) => {
    await route.fulfill()
  })
}
