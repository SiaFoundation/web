import { Page } from 'playwright'

export async function mockApiSiaScanExchangeRates({ page }: { page: Page }) {
  await page.route(
    'https://api.siascan.com/exchange-rate/siacoin/*',
    async (route) => {
      if (route.request().url().endsWith('jpy')) {
        await route.fulfill({ json: 0.727779694168 })
      } else {
        await route.fulfill({ json: 0.003944045283 })
      }
    }
  )
}

export async function mockApiSiaScanExchangeRatesUnroute({
  page,
}: {
  page: Page
}) {
  await page.unroute('https://api.siascan.com/exchange-rate/siacoin/*')
}

export async function mockApiSiaScanExchangeRatesHanging({
  page,
}: {
  page: Page
}) {
  await page.route(
    'https://api.siascan.com/exchange-rate/siacoin/*',
    async () => {
      await new Promise(() => {
        // Never resolve, leaving the request hanging.
      })
    }
  )
}
