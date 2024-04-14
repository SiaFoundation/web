import { runFetch } from './fetch'
import {
  api,
  SiaCentralExchangeRatesResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralExchangeRates(args?: {
  config?: {
    api: string
  }
}) {
  const { config } = args || {}
  return runFetch<SiaCentralExchangeRatesResponse>(
    `${config?.api || api}/market/exchange-rate?currencies=sc`
  )
}
