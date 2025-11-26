import {
  useActiveDaemonExplorerExchangeRate,
  useRemoteDataset,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useAdminContracts } from '@siafoundation/indexd-react'
import { ContractData } from './types'
import { useAppSettings } from '@siafoundation/react-core'
import { transformContract } from './transform'
import {
  AdminContractsParams,
  AdminContractsSortBy,
} from '@siafoundation/indexd-types'
import { useContractsParams } from './useContractsParams'
import { contractsColumns } from './contractsColumns'

export function useContracts() {
  const { columnFilters, columnSorts, offset, limit } = useContractsParams()
  const params = useMemo(() => {
    const filters: AdminContractsParams = { offset, limit }
    const good = columnFilters.find((f) => f.id === 'status')?.value
    if (good !== undefined) {
      filters.good = good
    }
    const revisable = columnFilters.find((f) => f.id === 'revisable')?.value
    if (revisable !== undefined) {
      filters.revisable = revisable
    }
    // Map all active sorts to API sortby and desc arrays.
    if (columnSorts.length > 0) {
      const sortby: AdminContractsSortBy[] = []
      const desc: boolean[] = []
      for (const sort of columnSorts) {
        const column = contractsColumns.find((col) => col.id === sort.id)
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
  const contracts = useAdminContracts({
    params,
  })
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()
  return useRemoteDataset(
    {
      contracts,
    },
    ({ contracts }) =>
      contracts.map((contract) => {
        const datum: ContractData = transformContract({
          contract,
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
