import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
  getContractsTimeRangeBlockHeight,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import {
  ContractStatus,
  useContracts as useContractsData,
  useEstimatedNetworkBlockHeight,
  useStateConsensus,
} from '@siafoundation/react-hostd'
import { createContext, useContext, useMemo } from 'react'
import {
  columnsDefaultVisible,
  columnsDefaultSort,
  TableColumnId,
} from './types'
import { columns } from './columns'
import { useDataset } from './dataset'

const defaultLimit = 50

const sortFieldMap = {
  timeline: 'negotiationHeight',
  status: 'status',
}

function useContractsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId>(
    'hostd/v0/contracts',
    columns,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const response = useContractsData({
    payload: {
      limit,
      offset,
      sortField: sortFieldMap[sortColumn],
      sortDesc: sortDirection === 'desc',
      contractIDs: filters
        .filter((f) => f.id === 'filterContractId')
        .map((f) => f.value),
      statuses: filters
        .filter((f) => f.id.startsWith('filterStatus'))
        .map((f) => f.value) as ContractStatus[],
    },
  })

  const dataset = useDataset({
    response,
  })

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns]
  )

  const isValidating = response.isValidating
  const error = response.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  const estimatedNetworkHeight = useEstimatedNetworkBlockHeight()
  const state = useStateConsensus({
    config: {
      swr: {
        refreshInterval: 60_000,
      },
    },
  })
  const currentHeight = state.data?.synced
    ? state.data.chainIndex.height
    : estimatedNetworkHeight

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, dataset || []),
    [currentHeight, dataset]
  )

  return {
    dataState,
    offset,
    limit,
    cellContext: {
      contractsTimeRange,
      currentHeight,
    },
    pageCount: dataset?.length || 0,
    totalCount: response.data?.count,
    isLoading: response.isValidating,
    columns: filteredTableColumns,
    dataset,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
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
