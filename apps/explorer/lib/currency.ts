import { toFixedOrPrecision } from '@siafoundation/design-system'
import { CurrencyOption } from '@siafoundation/react-core'
import { humanSiacoin } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

const digits = 2

export function siacoinToFiat(
  sc: string,
  exchange?: { currency: CurrencyOption; rate: string }
) {
  if (exchange) {
    const val = new BigNumber(sc).div(1e24).times(exchange?.rate || 1)
    return `${exchange?.currency.prefix || ''}${toFixedOrPrecision(val, {
      digits,
    })}`
  } else {
    return humanSiacoin(sc)
  }
}
