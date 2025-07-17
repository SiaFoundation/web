import {
  useDaemonExplorerHostsList,
  useDatasetState,
  useMultiSelect,
  usePaginationOffset,
  useServerFilters,
  useTableState,
} from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import {
  useHostsAllowlist,
  useHostsBlocklist,
  useHosts as useHostsSearch,
} from '@siafoundation/renterd-react'
import {
  HostsFilterMode,
  HostsPayload,
  HostsUsabilityMode,
} from '@siafoundation/renterd-types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { useContracts } from '../contracts'
import { columns } from './columns'
import { useDataset } from './dataset'
import {
  HostContext,
  HostDataWithLocation,
  ViewMode,
  columnsDefaultVisible,
} from './types'

const defaultLimit = 50

function useHostsMain() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()

  const keyIn = useMemo(() => {
    let keyIn: string[] = []
    if (filters.find((f) => f.id === 'hasActiveContracts') && allContracts) {
      keyIn = allContracts.map((c) => c.hostKey)
    }
    const publicKeyEquals = filters.find((f) => f.id === 'publicKeyEquals')
    if (publicKeyEquals?.value) {
      keyIn.push(publicKeyEquals.value)
    }
    return keyIn.length ? keyIn : undefined
  }, [filters, allContracts])

  const payload = useMemo(() => {
    const p: HostsPayload = {
      limit,
      offset,
      usabilityMode: (filters.find((f) => f.id === 'usabilityMode')?.value ||
        'all') as HostsUsabilityMode,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn,
    }
    return p
  }, [filters, keyIn, limit, offset])

  const response = useHostsSearch({
    payload,
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const allowlist = useHostsAllowlist()
  const blocklist = useHostsBlocklist()
  const isAllowlistActive = !!allowlist.data?.length

  const { settings } = useAppSettings()
  const geo = useDaemonExplorerHostsList({
    params: {
      sortBy: 'storage_price',
      dir: 'asc',
      limit: 1000,
    },
    payload: {
      online: true,
    },
  })

  useEffect(() => {
    if (!settings.siascan) {
      setViewMode('list')
    }
  }, [settings.siascan])

  const geoHosts = useMemo(() => geo.data || [], [geo.data])

  const scrollToHost = useCallback((publicKey: string) => {
    // move table to host, select via data id data-table
    const rowEl = document.getElementById(publicKey)
    const scrollEl = document.getElementById('scroll-hosts')
    if (!rowEl || !scrollEl) {
      return
    }
    scrollEl.scroll({
      top: rowEl.offsetTop - 50,
      behavior: 'smooth',
    })
  }, [])

  const dataset = useDataset({
    response,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
    geoHosts,
  })

  const {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('renterd/v1/hosts', {
    columns,
    columnsDefaultVisible,
  })

  const hostsWithLocation = useMemo(
    () =>
      dataset?.filter(
        (h) => h.location && h.v2 && h.v2Settings
      ) as HostDataWithLocation[],
    [dataset]
  )

  const multiSelect = useMultiSelect(dataset)

  const activeHost = useMemo(() => {
    if (multiSelect.selectedIds.length === 1) {
      return dataset?.find((d) => d.publicKey === multiSelect.selectedIds[0])
    }
  }, [dataset, multiSelect.selectedIds])

  const datasetPage = useMemo(() => {
    if (!dataset) {
      return undefined
    }
    return dataset.map((datum) => {
      return {
        ...datum,
        onClick: (e: React.MouseEvent<HTMLTableRowElement>) =>
          multiSelect.onSelect(datum.id, e),
        isSelected: !!multiSelect.selection[datum.id],
      }
    })
  }, [dataset, multiSelect])

  const siascanUrl = useSiascanUrl()
  const tableContext: HostContext = useMemo(
    () => ({
      siascanUrl,
      multiSelect,
    }),
    [siascanUrl, multiSelect]
  )

  const onHostMapClick = useCallback(
    (publicKey: string, location?: [number, number]) => {
      if (activeHost?.publicKey !== publicKey) {
        multiSelect.deselectAll()
        multiSelect.onSelect(publicKey)
        scrollToHost(publicKey)
      }
    },
    [activeHost, multiSelect, scrollToHost]
  )

  const isValidating = response.isValidating
  const error = response.error
  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
    offset,
    filters,
  })

  return {
    viewMode,
    activeHost,
    onHostMapClick,
    setViewMode,
    hostsWithLocation,
    error,
    datasetState,
    offset,
    limit,
    datasetPageTotal: datasetPage?.length || 0,
    visibleColumns,
    datasetPage,
    tableContext,
    configurableColumns,
    visibleColumnIds,
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
    multiSelect,
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
