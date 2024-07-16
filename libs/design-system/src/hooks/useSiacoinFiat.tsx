import { type CurrencyOption, useAppSettings } from '@siafoundation/react-core'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

type Props = {
  sc?: BigNumber
}

const zero = new BigNumber(0)

export function useSiacoinFiat({ sc }: Props): {
  fiat?: BigNumber
  currency?: CurrencyOption
} {
  const { settings } = useAppSettings()
  const rates = useSiaCentralExchangeRates({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return zero
    }
    return new BigNumber(rates.data?.rates.sc[settings.currency.id] || zero)
  }, [rates.data, settings])
  const fiat = useMemo(() => new BigNumber(sc || 0).times(rate), [sc, rate])

  if (!sc || rate.isZero()) {
    return {}
  }

  return {
    fiat,
    currency: settings.currency,
  }
}
