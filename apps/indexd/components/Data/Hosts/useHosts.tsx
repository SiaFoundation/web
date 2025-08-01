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
  const rawHosts = useIndexHosts()
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
  const hosts = useMemo(
    () =>
      rawHosts.data?.map((host) => {
        const datum = transformHost(host, {
          geo: geo.data,
          exchange,
        })
        return datum
      }) || [],
    [rawHosts.data, geo.data, exchange],
  )

  return hosts
}
