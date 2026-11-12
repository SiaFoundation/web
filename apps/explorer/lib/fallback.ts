import { unstable_serialize } from 'swr'
import { CurrencyID, exchangeRateRoute } from '@siafoundation/explored-types'
import { getExplored } from './explored'

// Testnet coins have no market price, so the rate always comes from mainnet.
// This is also the client hooks' default address, which the key must match.
const exchangeRateApi = 'https://api.siascan.com'

// Builds fallback data for the exchange rate. Passing this to the SWR
// config's fallback prop allows the exchange rate hooks with a matching
// key to server-render with an initial exchange rate value. If the request
// fails there is no fallback and the client fetches the rate itself.
export async function buildFallbackDataExchangeRate(currency: CurrencyID) {
  try {
    const explored = await getExplored(exchangeRateApi)
    const { data: rate } = await explored.exchangeRate({ params: { currency } })
    // react-core hook keys are ['get', `${api}${route}`]. path.join would
    // collapse the "//" in the protocol, so the key would never match.
    const route = exchangeRateRoute.replace(':currency', currency)
    return { [unstable_serialize(['get', `${exchangeRateApi}${route}`])]: rate }
  } catch {
    return {}
  }
}
