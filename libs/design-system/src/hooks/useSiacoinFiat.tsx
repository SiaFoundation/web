import {
  CurrencyOption,
  useAppSettings,
  useSiaCentralMarketExchangeRate,
} from '@siafoundation/react-core'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'

type Props = {
  sc: BigNumber
}

const zero = new BigNumber(0)

export function useSiacoinFiat({ sc }: Props): {
  fiat?: BigNumber
  currency?: CurrencyOption
} {
  const { settings } = useAppSettings()
  const rates = useSiaCentralMarketExchangeRate()
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return zero
    }
    return new BigNumber(rates.data?.rates.sc[settings.currency.id] || zero)
  }, [rates.data, settings])
  const fiat = useMemo(() => new BigNumber(sc).times(rate), [sc, rate])

  if (rate.isZero()) {
    return {}
  }

  return {
    fiat,
    currency: settings.currency,
  }
}
