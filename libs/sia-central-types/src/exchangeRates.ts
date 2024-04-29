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

export type SiaCentralCurrency = keyof SiaCentralExchangeRates['sc']

export type SiaCentralExchangeRatesParams = {
  currencies?: string
}
export type SiaCentralExchangeRatesPayload = void
export type SiaCentralExchangeRatesResponse = {
  message: string
  type: string
  rates: SiaCentralExchangeRates
  timestamp: string
}
