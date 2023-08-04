import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import {
  HostsSearchFilterMode,
  HostsUsabilityMode,
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
import { useApp } from '../app'

const defaultLimit = 50

function useHostsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()
  const { autopilot } = useApp()

  const keyIn = useMemo(() => {
    let keyIn: string[] = []
    if (filters.find((f) => f.id === 'activeContracts') && allContracts) {
      keyIn = allContracts.map((c) => c.hostKey)
    }
    if (filters.find((f) => f.id === 'publicKeyContains')) {
      keyIn.push(filters.find((f) => f.id === 'publicKeyContains')?.value)
    }
    return keyIn.length ? keyIn : undefined
  }, [filters, allContracts])

  const autopilotResponse = useAutopilotHostsSearch({
    disabled:
      // prevents an extra fetch when allContracts is null
      (filters.find((f) => f.id === 'activeContracts') && !allContracts) ||
      autopilot.state !== 'on',
    payload: {
      limit,
      offset,
      usabilityMode: (filters.find((f) => f.id === 'usabilityMode')?.value ||
        'all') as HostsUsabilityMode,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsSearchFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn,
    },
    config: {
      swr: {
        // before autopilot is configured this will repeatedly 500
        errorRetryInterval: 20_000,
      },
    },
  })

  const regularResponse = useHostsSearch({
    disabled: autopilot.state !== 'off',
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
    autopilotState: autopilot.state,
    autopilotResponse,
    regularResponse,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
  })

  const disabledCategories = useMemo(
    () => (autopilot.state === 'off' ? ['autopilot'] : []),
    [autopilot.state]
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
    autopilot.state === 'on'
      ? autopilotResponse.isValidating
      : regularResponse.isValidating
  const error =
    autopilot.state === 'on' ? autopilotResponse.error : regularResponse.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  return {
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
