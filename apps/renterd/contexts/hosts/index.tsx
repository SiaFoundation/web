import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import {
  HostsSearchFilterMode,
  useAutopilotHostsSearch,
  useHostsAllowlist,
  useHostsBlocklist,
  useHostsSearch,
} from '@siafoundation/react-core'
import { createContext, useContext, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  HostData,
  TableColumnId,
  columnsMeta,
  columnsDefaultVisible,
  columnsDefaultSort,
} from './types'
import { useRouter } from 'next/router'
import { useAutopilot } from '../../hooks/useAutopilot'
import { useColumns } from './columns'
import { useContracts } from '../contracts'
import { useDataset } from './dataset'

function useHostsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()
  const { isAutopilotEnabled } = useAutopilot()

  const autopilotResponse = useAutopilotHostsSearch({
    disabled: isAutopilotEnabled !== 'on',
    payload: {
      limit,
      offset,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsSearchFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn:
        filters.find((f) => f.id === 'activeContracts') && allContracts
          ? allContracts.map((c) => c.hostKey)
          : undefined,
    },
  })

  const regularResponse = useHostsSearch({
    disabled: isAutopilotEnabled !== 'off',
    payload: {
      limit,
      offset,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsSearchFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn:
        filters.find((f) => f.id === 'activeContracts') && allContracts
          ? allContracts.map((c) => c.hostKey)
          : undefined,
    },
  })
  const isValidating = isAutopilotEnabled
    ? autopilotResponse.isValidating
    : regularResponse.isValidating

  const allowlist = useHostsAllowlist()
  const blocklist = useHostsBlocklist()
  const isAllowlistActive = !!allowlist.data?.length

  const dataset = useDataset({
    isAutopilotEnabled,
    autopilotResponse,
    regularResponse,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
  })

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId>(
    'renterd/v0/hosts',
    columnsMeta,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const tableColumns = useColumns({ isAllowlistActive })

  const filteredTableColumns = useMemo(
    () =>
      tableColumns.filter(
        (column) =>
          columnsMeta[column.id].fixed || enabledColumns.includes(column.id)
      ),
    [tableColumns, enabledColumns]
  )

  const dataState = useDatasetEmptyState(dataset, isValidating, filters)

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

type State = ReturnType<typeof useHostsMain>

const HostsContext = createContext({} as State)
export const useHosts = () => useContext(HostsContext)

type Props = {
  children: React.ReactNode
}

export function HostsProvider({ children }: Props) {
  const state = useHostsMain()
  return <HostsContext.Provider value={state}>{children}</HostsContext.Provider>
}
