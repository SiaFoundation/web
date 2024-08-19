import { CurrencyId, useAppSettings } from '@siafoundation/react-core'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'

type Props = {
  currency?: CurrencyId | ''
}

export function useExchangeRate({ currency }: Props): BigNumber {
  const { settings } = useAppSettings()
  const rates = useSiaCentralExchangeRates({
    disabled: !currency || !settings.siaCentral,
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return new BigNumber(0)
    }
    return new BigNumber((currency && rates.data?.rates.sc[currency]) || 0)
  }, [rates.data, settings, currency])

  return rate
}

export function useActiveExchangeRate(): BigNumber {
  const { settings } = useAppSettings()
  return useExchangeRate({ currency: settings.currency.id })
}
