import { unstable_serialize } from 'swr'
import { CurrencyID, exchangeRateRoute } from '@siafoundation/explored-types'
import { exploredApi } from '../config'
import path from 'path'
import { getExplored } from './explored'

// Builds fallback data for the exchange rate. Passing this to the SWR
// config's fallback prop allows the exchange rate hooks with a matching
// key to server-render with an initial exchange rate value.
export async function buildFallbackDataExchangeRate(currency: CurrencyID) {
  const explored = await getExplored()
  const { data: rate } = await explored.exchangeRate({
    params: { currency: 'usd' },
  })
  return {
    // Hooks build with react-core have keys of the form:
    // ['method', `${api}${route}${params}${JSON.stringify(args.payload)}`]
    // The key must be built from the public address even though the request
    // above may have used the internal one. The client hooks build their keys
    // from the public address, and a mismatch means the fallback silently
    // stops matching and every page refetches on hydration.
    [unstable_serialize([
      'get',
      path.join(exploredApi, exchangeRateRoute.replace(':currency', currency)),
    ])]: rate,
  }
}
