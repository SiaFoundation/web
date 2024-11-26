import {
  triggerErrorToast,
  truncate,
  useDatasetEmptyState,
  useServerFilters,
  useTableState,
} from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import {
  useAutopilotState,
  useHostsAllowlist,
  useHostsBlocklist,
  useHosts as useHostsSearch,
} from '@siafoundation/renterd-react'
import {
  HostsFilterMode,
  HostsPayload,
  HostsUsabilityMode,
} from '@siafoundation/renterd-types'
import { useSiaCentralHosts } from '@siafoundation/sia-central-react'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Commands, emptyCommands } from '../../components/Hosts/HostMap/Globe'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { useContracts } from '../contracts'
import { columns } from './columns'
import { useDataset } from './dataset'
import {
  HostContext,
  HostDataWithLocation,
  TableColumnId,
  ViewMode,
  columnsDefaultVisible,
} from './types'

const defaultLimit = 50

function useHostsMain() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()
  const autopilotState = useAutopilotState()

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
  const geo = useSiaCentralHosts({
    disabled: !settings.siaCentral,
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  useEffect(() => {
    if (!settings.siaCentral) {
      setViewMode('list')
    }
  }, [settings.siaCentral])

  const geoHosts = useMemo(() => geo.data?.hosts || [], [geo.data])

  const cmdRef = useRef<Commands>(emptyCommands)

  const setCmd = useCallback(
    (cmd: Commands) => {
      cmdRef.current = cmd
    },
    [cmdRef]
  )

  const [activeHostPublicKey, setActiveHostPublicKey] = useState<string>()

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

  const onHostMapClick = useCallback(
    (publicKey: string, location?: [number, number]) => {
      if (activeHostPublicKey === publicKey) {
        setActiveHostPublicKey(undefined)
        return
      }
      setActiveHostPublicKey(publicKey)
      if (location) {
        cmdRef.current.moveToLocation(location)
      }
      scrollToHost(publicKey)
    },
    [setActiveHostPublicKey, cmdRef, activeHostPublicKey, scrollToHost]
  )

  const onHostListClick = useCallback(
    (publicKey: string, location?: [number, number]) => {
      if (activeHostPublicKey === publicKey) {
        setActiveHostPublicKey(undefined)
        return
      }
      setActiveHostPublicKey(publicKey)
      if (location) {
        cmdRef.current.moveToLocation(location)
      } else {
        triggerErrorToast({
          title: 'Geographic location is unknown for host',
          body: truncate(publicKey, 20),
        })
      }
      scrollToHost(publicKey)
    },
    [setActiveHostPublicKey, cmdRef, activeHostPublicKey, scrollToHost]
  )

  const onHostMapHover = useCallback(
    (publicKey: string, location?: [number, number]) => null,
    []
  )

  const dataset = useDataset({
    response,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
    geoHosts,
    onHostSelect: onHostListClick,
  })

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
  })

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns]
  )

  const isValidating = response.isValidating
  const error = response.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  const siascanUrl = useSiascanUrl()
  const isAutopilotConfigured = !!autopilotState.data?.configured
  const tableContext: HostContext = useMemo(
    () => ({
      isAutopilotConfigured,
      siascanUrl,
    }),
    [isAutopilotConfigured, siascanUrl]
  )

  const hostsWithLocation = useMemo(
    () => dataset?.filter((h) => h.location) as HostDataWithLocation[],
    [dataset]
  )

  const activeHost = useMemo(
    () => dataset?.find((d) => d.publicKey === activeHostPublicKey),
    [dataset, activeHostPublicKey]
  )

  return {
    setCmd,
    viewMode,
    activeHost,
    onHostMapHover,
    onHostMapClick,
    setViewMode,
    hostsWithLocation,
    error,
    dataState,
    offset,
    limit,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    dataset,
    tableContext,
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
