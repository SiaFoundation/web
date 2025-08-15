import {
  useActiveDaemonExplorerExchangeRate,
  useDaemonExplorerHost,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminHost } from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import { useAppSettings } from '@siafoundation/react-core'

export function useHost(publicKey?: string) {
  const geo = useDaemonExplorerHost({
    disabled: !publicKey,
    params: {
      id: publicKey || '',
    },
  })
  const rawHost = useAdminHost({
    disabled: !publicKey,
    params: {
      hostkey: publicKey || '',
    },
  })
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
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
