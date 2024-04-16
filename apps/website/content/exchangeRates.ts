import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { siaCentral } from '../config/siaCentral'
import { to } from '@siafoundation/request'

const maxAge = getMinutesInSeconds(5)

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
