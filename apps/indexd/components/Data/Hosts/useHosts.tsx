import {
  useActiveDaemonExplorerExchangeRate,
  useRemoteDataset,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminHosts } from '@siafoundation/indexd-react'
import { transformHost } from './transform'
import { useAppSettings } from '@siafoundation/react-core'
import { AdminHostsParams, AdminHostsSortBy } from '@siafoundation/indexd-types'
import { useHostsParams } from './useHostsParams'
import { columns } from './hostsColumns'

export function useHosts() {
  const { columnFilters, columnSorts, offset, limit } = useHostsParams()
  const params = useMemo(() => {
    const filters: AdminHostsParams = { offset, limit }
    const usable = columnFilters.find((f) => f.id === 'usable')?.value
    // Default to usable: true unless user explicitly sets it to false.
    filters.usable = usable !== undefined ? usable : true
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
    // Map all active sorts to API sortby and desc arrays.
    if (columnSorts.length > 0) {
      const sortby: AdminHostsSortBy[] = []
      const desc: boolean[] = []
      for (const sort of columnSorts) {
        const column = columns.find((col) => col.id === sort.id)
        const sortKey = column?.sortKey
        if (sortKey !== undefined) {
          sortby.push(sortKey)
          desc.push(sort.desc ?? false)
        }
      }
      if (sortby.length > 0) {
        filters.sortby = sortby
        filters.desc = desc
      }
    }
    return filters
  }, [columnFilters, columnSorts, offset, limit])
  const hosts = useAdminHosts({
    params,
  })
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()
  return useRemoteDataset(
    {
      hosts,
    },
    ({ hosts }) =>
      hosts.map((host) => {
        const datum = transformHost({
          host,
          currencyDisplay: settings.currencyDisplay,
          exchange: exchangeRate.currency &&
            exchangeRate.rate && {
              currency: exchangeRate.currency,
              rate: exchangeRate.rate,
            },
        })
        return datum
      }),
    {
      offset,
      filters: columnFilters,
    },
  )
}
