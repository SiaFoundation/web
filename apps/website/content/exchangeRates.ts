import { getCacheValue } from '../lib/cache'
import { siaCentral } from '../config/siaCentral'
import { to } from '@siafoundation/request'
import { minutesInSeconds } from '@siafoundation/units'

const maxAge = minutesInSeconds(5)

export async function getExchangeRates() {
  return getCacheValue(
    'exchangeRates',
    async () => {
      const [exchangeRates] = await to(
        siaCentral.exchangeRates({
          params: {
            currencies: 'sc',
          },
        })
      )
      return exchangeRates
    },
    maxAge
  )
}
