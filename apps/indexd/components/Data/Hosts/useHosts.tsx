import { useActiveSiascanExchangeRate } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminHosts } from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import { useAppSettings } from '@siafoundation/react-core'
import { AdminHostsParams } from '@siafoundation/indexd-types'
import { useSiascanHosts } from '../useSiascanHosts'
import { useHostsParams } from './useHostsParams'

export function useHosts() {
  const geo = useSiascanHosts()
  const { columnFilters, offset, limit } = useHostsParams()
  const params = useMemo(() => {
    const filters: AdminHostsParams = { offset, limit }
    const usable = columnFilters.find((f) => f.id === 'usable')?.value
    if (usable !== undefined) {
      filters.usable = usable
    }
    const blocked = columnFilters.find((f) => f.id === 'blocked')?.value
    if (blocked !== undefined) {
      filters.blocked = blocked
    }
    const activecontracts = columnFilters.find(
      (f) => f.id === 'activecontracts',
    )?.value
    if (activecontracts !== undefined) {
      filters.activecontracts = activecontracts
    }
    return filters
  }, [columnFilters, offset, limit])
  const rawHosts = useAdminHosts({
    params,
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
