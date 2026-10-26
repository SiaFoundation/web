import { Page } from '@playwright/test'
import { exchangeRateRoute } from '@siafoundation/explored-types'

// The cluster's indexd reports a mock explorer URL in its state, and the UI
// fetches exchange rates from that explorer directly. The URL does not
// resolve, so the exchange rate requests are mocked.
const daemonExplorerApi = 'https://explorer.internal'

export async function mockApiDaemonExplorerExchangeRate({
  page,
  rate,
}: {
  page: Page
  rate: number
}) {
  await page.route(
    `${daemonExplorerApi}${exchangeRateRoute.replace(':currency', '*')}`,
    async (route) => {
      await route.fulfill({ json: rate })
    },
  )
}
