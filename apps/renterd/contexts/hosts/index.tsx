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
import {
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
  const { autopilotMode } = useAutopilot()

  const autopilotResponse = useAutopilotHostsSearch({
    disabled: autopilotMode !== 'on',
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
    disabled: autopilotMode !== 'off',
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

  const allowlist = useHostsAllowlist()
  const blocklist = useHostsBlocklist()
  const isAllowlistActive = !!allowlist.data?.length

  const dataset = useDataset({
    autopilotMode,
    autopilotResponse,
    regularResponse,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
  })

  const disabledCategories = useMemo(
    () => (autopilotMode === 'off' ? ['autopilot'] : []),
    [autopilotMode]
  )

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
    columnsDefaultSort,
    disabledCategories
  )

  const tableColumns = useColumns({ isAllowlistActive })

  const filteredTableColumns = useMemo(
    () => tableColumns.filter((column) => enabledColumns.includes(column.id)),
    [tableColumns, enabledColumns]
  )

  const isValidating =
    autopilotMode === 'on'
      ? autopilotResponse.isValidating
      : regularResponse.isValidating
  const error =
    autopilotMode === 'on' ? autopilotResponse.error : regularResponse.error
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
