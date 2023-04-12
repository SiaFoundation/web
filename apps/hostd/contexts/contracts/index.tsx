import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useContracts as useContractsData } from '@siafoundation/react-hostd'
import { createContext, useContext, useMemo } from 'react'
import {
  columnsDefaultVisible,
  columnsDefaultSort,
  TableColumnId,
} from './types'
import { columns } from './columns'
import { useDataset } from './dataset'

const defaultLimit = 50

function useContractsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const response = useContractsData({
    payload: {
      limit,
      offset,
      // filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
      //   'all') as HostsSearchFilterMode,
      // addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      // keyIn:
      //   filters.find((f) => f.id === 'activeContracts') && allContracts
      //     ? allContracts.map((c) => c.hostKey)
      //     : undefined,
    },
  })

  const dataset = useDataset({
    response,
  })

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

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns]
  )

  const isValidating = response.isValidating
  const error = response.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  return {
    dataState,
    offset,
    limit,
    pageCount: dataset?.length || 0,
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
