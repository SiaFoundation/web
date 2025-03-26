import { toFixedOrPrecision } from '@siafoundation/design-system'
import { CurrencyOption } from '@siafoundation/react-core'
import { humanSiacoin } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

const digits = 2

export function hastingsToFiat(
  hastings: string,
  exchange?: { currency: CurrencyOption; rate: BigNumber }
) {
  if (exchange) {
    const val = new BigNumber(hastings).div(1e24).times(exchange?.rate || 1)
    return `${exchange?.currency.prefix || ''}${toFixedOrPrecision(val, {
      digits,
    })}`
  } else {
    return humanSiacoin(hastings)
  }
}
