import {
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useServerFilters,
  useTableState,
} from '@siafoundation/design-system'
import { useContracts as useContractsData } from '@siafoundation/hostd-react'
import type { ContractStatus } from '@siafoundation/hostd-types'
import { useRouter } from 'next/router'
import { createContext, useContext, useMemo } from 'react'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { columns } from './columns'
import { useDataset } from './dataset'
import {
  type SortField,
  type TableColumnId,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'

const defaultLimit = 50

function useContractsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const {
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId, SortField>('hostd/v0/contracts', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const response = useContractsData({
    payload: {
      limit,
      offset,
      sortField: sortOptions.find((o) => o.id === sortField)?.value,
      sortDesc: sortDirection === 'desc',
      contractIDs: filters
        .filter((f) => f.id === 'filterContractId')
        .map((f) => f.value),
      statuses: filters
        .filter((f) => f.id.startsWith('filterStatus'))
        .map((f) => f.value) as ContractStatus[],
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const dataset = useDataset({
    response,
  })

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns],
  )

  const isValidating = response.isValidating
  const error = response.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  const { estimatedBlockHeight, isSynced, nodeBlockHeight } = useSyncStatus()
  const currentHeight = isSynced ? nodeBlockHeight : estimatedBlockHeight

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, dataset || []),
    [currentHeight, dataset],
  )

  const siascanUrl = useSiascanUrl()

  const cellContext = useMemo(
    () => ({
      contractsTimeRange,
      currentHeight,
      siascanUrl,
    }),
    [contractsTimeRange, currentHeight, siascanUrl],
  )

  return {
    dataState,
    offset,
    limit,
    cellContext,
    pageCount: dataset?.length || 0,
    totalCount: response.data?.count,
    columns: filteredTableColumns,
    dataset,
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}

type State = ReturnType<typeof useContractsMain>

const ContractsContext = createContext({} as State)
export const useContracts = () => useContext(ContractsContext)

type Props = {
  children: React.ReactNode
}

export function ContractsProvider({ children }: Props) {
  const state = useContractsMain()
  return (
    <ContractsContext.Provider value={state}>
      {children}
    </ContractsContext.Provider>
  )
}
