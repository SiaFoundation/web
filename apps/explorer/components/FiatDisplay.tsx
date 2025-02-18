import { CurrencyOption, SWRError } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { siacoinToFiat } from '../lib/currency'
import { Tooltip } from '@siafoundation/design-system'
import { WarningAlt24 } from '@siafoundation/react-icons'
import LoadingCurrency from './LoadingCurrency'

type Props = {
  sc: string
  exchange: {
    rate: BigNumber | undefined
    currency: CurrencyOption | undefined
    error: SWRError | undefined
    isLoading: boolean
  }
}

export default function FiatDisplay({
  sc,
  exchange: { rate, currency, error, isLoading },
}: Props) {
  if (isLoading) return <LoadingCurrency />
  if (error || !rate || !currency)
    return (
      <Tooltip content="Exchange lookup failed. Try again later.">
        <WarningAlt24 className="text-amber-600 dark:text-amber-500" />
      </Tooltip>
    )
  return siacoinToFiat(sc, { rate, currency })
}
