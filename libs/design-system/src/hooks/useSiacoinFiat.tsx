import { CurrencyOption, useAppSettings } from '@siafoundation/react-core'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useExchangeRate } from './useExchangeRate'

type Props = {
  sc: BigNumber
}

export function useSiacoinFiat({ sc }: Props): {
  fiat?: BigNumber
  currency?: CurrencyOption
} {
  const { settings } = useAppSettings()
  const rate = useExchangeRate({ currency: settings.currency.id })
  const fiat = useMemo(() => new BigNumber(sc).times(rate), [sc, rate])

  if (rate.isZero()) {
    return {}
  }

  return {
    fiat,
    currency: settings.currency,
  }
}
