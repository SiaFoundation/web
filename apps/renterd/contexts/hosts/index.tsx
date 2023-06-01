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
} from '@siafoundation/react-renterd'
import { createContext, useContext, useMemo } from 'react'
import { TableColumnId, columnsDefaultVisible } from './types'
import { useRouter } from 'next/router'
import { columns } from './columns'
import { useContracts } from '../contracts'
import { useDataset } from './dataset'
import { useRenterd } from '../renterd'

const defaultLimit = 50

function useHostsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()
  const { autopilotMode } = useRenterd()

  const autopilotResponse = useAutopilotHostsSearch({
    disabled:
      // prevents an extra fetch when allContracts is null
      (filters.find((f) => f.id === 'activeContracts') && !allContracts) ||
      autopilotMode !== 'on',
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
    config: {
      swr: {
        // before autopilot is configured this will repeatedly 500
        errorRetryInterval: 20_000,
      },
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
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId, never>('renterd/v0/hosts', {
    columns,
    columnsDefaultVisible,
    disabledCategories,
  })

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns]
  )

  const isValidating =
    autopilotMode === 'on'
      ? autopilotResponse.isValidating
      : regularResponse.isValidating
  const error =
    autopilotMode === 'on' ? autopilotResponse.error : regularResponse.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  return {
    autopilotMode,
    error,
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
