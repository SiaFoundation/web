import { SiaCentralExchangeRates } from '@siafoundation/sia-central'
import BigNumber from 'bignumber.js'

export function siacoinToDollars(sc: string, rates: SiaCentralExchangeRates) {
  return `$${new BigNumber(sc).div(1e24).times(rates.sc.usd).toFixed(2)}`
}
