import { SiaCentralExchangeRatesResponse } from '@siafoundation/sia-central'
import { cloneDeep } from '@technically/lodash'
import { Page } from 'playwright'

const data: SiaCentralExchangeRatesResponse = {
  message: 'successfully retrieved exchange rate',
  type: 'success',
  rates: {
    sc: {
      aud: '0.016136871549',
      bch: '0.000021499880703',
      btc: '0.000000149047',
      cad: '0.014328484298',
      cny: '0.076310722577',
      eth: '0.0000029068532077',
      eur: '0.009737538604',
      gbp: '0.008359151948',
      jpy: '1.600530478116',
      ltc: '0.000116295710314',
      rub: '0.978819669836',
      scp: '0.0623627615062762',
      sf: '0.000000745235',
      usd: '0.010571307522',
    },
  },
  timestamp: '2024-03-26T13:12:22.7348119Z',
}

export async function mockSiaCentralExchangeRates({ page }: { page: Page }) {
  const json = cloneDeep(data)
  await page.route(
    'https://api.siacentral.com/v2/market/exchange-rate?currencies=sc',
    async (route) => {
      await route.fulfill({ json })
    }
  )
  return json
}
