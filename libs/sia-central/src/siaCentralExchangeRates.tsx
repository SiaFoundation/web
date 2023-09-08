import { runFetch } from './fetch'
import { api } from './types'

export type SiaCentralExchangeRates = {
  sc: {
    bch: string
    btc: string
    cad: string
    cny: string
    eth: string
    eur: string
    aud: string
    gbp: string
    jpy: string
    ltc: string
    rub: string
    scp: string
    sf: string
    usd: string
  }
}

export type SiaCentralExchangeRatesResponse = {
  message: string
  type: string
  rates: SiaCentralExchangeRates
  timestamp: string
}

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
