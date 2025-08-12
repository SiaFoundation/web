import {
  useActiveSiascanExchangeRate,
  useSiascanHost,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import {
  useAdminState,
  useAdminHost as useIndexHost,
} from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import { useAppSettings } from '@siafoundation/react-core'

export function useHost(publicKey?: string) {
  const state = useAdminState()
  const geo = useSiascanHost({
    disabled: !state.data || !publicKey,
    api:
      state.data?.network === 'mainnet'
        ? 'https://api.siascan.com'
        : 'https://api.siascan.com/zen',
    params: {
      id: publicKey || '',
    },
  })
  const rawHost = useIndexHost({
    disabled: !publicKey,
    params: {
      hostkey: publicKey || '',
    },
  })
  const exchangeRate = useActiveSiascanExchangeRate()
  const { settings } = useAppSettings()
  const host = useMemo(() => {
    if (!rawHost.data) {
      return undefined
    }
    const datum = transformHost(rawHost.data, {
      location: geo.data?.location,
      currencyDisplay: settings.currencyDisplay,
      exchange: exchangeRate.currency &&
        exchangeRate.rate && {
          currency: exchangeRate.currency,
          rate: exchangeRate.rate,
        },
    })
    return datum
  }, [
    rawHost.data,
    geo.data,
    exchangeRate.currency,
    exchangeRate.rate,
    settings.currencyDisplay,
  ])

  return host
}
