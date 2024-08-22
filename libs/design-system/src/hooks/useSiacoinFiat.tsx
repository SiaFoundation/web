import {
  CurrencyOption,
  useAppSettings,
  useExchangeRate,
} from '@siafoundation/react-core'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'

type Props = {
  sc: BigNumber
}

export function useSiacoinFiat({ sc }: Props): {
  fiat?: BigNumber
  currency?: CurrencyOption
} {
  const { settings } = useAppSettings()
  const exchangeRate = useExchangeRate({
    currency: settings.currency.id,
  })
  const fiat = useMemo(
    () => new BigNumber(sc).times(exchangeRate.rate || 1),
    [sc, exchangeRate]
  )

  if (!exchangeRate.rate || exchangeRate.rate.isZero()) {
    return {}
  }

  return {
    fiat,
    currency: settings.currency,
  }
}
