import { explored } from '../config/explored'
import { unstable_serialize } from 'swr'
import { CurrencyID, exchangeRateRoute } from '@siafoundation/explored-types'
import { exploredApi } from '../config'

// Builds fallback data for the exchange rate. Passing this to the SWR
// config's fallback prop allows the exchange rate hooks with a matching
// key to server-render with an initial exchange rate value.
export async function buildFallbackDataExchangeRate(currency: CurrencyID) {
  const rate = await explored.exchangeRate({
    params: {
      currency,
    },
  })
  return {
    // Hooks build with react-core have keys of the form:
    // ['method', `${api}${route}${params}${JSON.stringify(args.payload)}`]
    [unstable_serialize([
      'get',
      `${exploredApi}${exchangeRateRoute.replace(':currency', currency)}`,
    ])]: rate.data,
  }
}
