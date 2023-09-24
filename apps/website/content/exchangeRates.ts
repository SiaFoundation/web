import { getSiaCentralExchangeRates } from '@siafoundation/sia-central'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getExchangeRates() {
  return getCacheValue('exchangeRates', getSiaCentralExchangeRates, maxAge)
}
