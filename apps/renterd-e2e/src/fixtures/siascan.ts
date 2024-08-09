import { Page } from 'playwright'

export async function mockApiSiaScanExchangeRates({ page }: { page: Page }) {
  await page.route(
    'https://api.siascan.com/exchange-rate/siacoin/*',
    async (route) => {
      await route.fulfill({ json: 0.003944045283 })
    }
  )
}
