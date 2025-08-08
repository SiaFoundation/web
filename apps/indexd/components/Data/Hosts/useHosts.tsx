import {
  useActiveSiascanExchangeRate,
  useSiascanHostsList,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import {
  useIndexdState,
  useHosts as useIndexHosts,
} from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import { useAppSettings } from '@siafoundation/react-core'

export function useHosts() {
  const state = useIndexdState()
  const geo = useSiascanHostsList({
    disabled: !state.data,
    api:
      state.data?.network === 'mainnet'
        ? 'https://api.siascan.com'
        : 'https://api.siascan.com/zen',
    params: {
      sortBy: 'storage_price',
      dir: 'asc',
      limit: 1000,
    },
    payload: {
      online: true,
    },
  })
  const rawHosts = useIndexHosts({
    params: {
      limit: 500,
    },
  })
  const exchangeRate = useActiveSiascanExchangeRate()
  const { settings } = useAppSettings()
  const hosts = useMemo(
    () =>
      rawHosts.data?.map((host) => {
        const location = geo.data?.find(
          (h) => h.publicKey === host.publicKey,
        )?.location
        const datum = transformHost(host, {
          location,
          currencyDisplay: settings.currencyDisplay,
          exchange: exchangeRate.currency &&
            exchangeRate.rate && {
              currency: exchangeRate.currency,
              rate: exchangeRate.rate,
            },
        })
        return datum
      }) || [],
    [
      rawHosts.data,
      geo.data,
      exchangeRate.currency,
      exchangeRate.rate,
      settings.currencyDisplay,
    ],
  )

  return hosts
}
