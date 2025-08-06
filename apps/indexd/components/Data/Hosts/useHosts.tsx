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
  const exchange = useMemo(
    () =>
      exchangeRate.currency &&
      exchangeRate.rate && {
        currency: exchangeRate.currency,
        rate: exchangeRate.rate,
      },
    [exchangeRate.currency, exchangeRate.rate],
  )
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
          exchange,
        })
        return datum
      }) || [],
    [rawHosts.data, geo.data, exchange, settings.currencyDisplay],
  )

  return hosts
}
