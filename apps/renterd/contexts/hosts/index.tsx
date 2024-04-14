import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
  triggerErrorToast,
  truncate,
} from '@siafoundation/design-system'
import {
  HostsSearchFilterMode,
  HostsUsabilityMode,
  useAutopilotHostsSearch,
  useHostsAllowlist,
  useHostsBlocklist,
  useHostsSearch,
} from '@siafoundation/renterd-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  TableColumnId,
  columnsDefaultVisible,
  ViewMode,
  HostDataWithLocation,
} from './types'
import { useRouter } from 'next/router'
import { columns } from './columns'
import { useContracts } from '../contracts'
import { useDataset } from './dataset'
import { useApp } from '../app'
import { useAppSettings } from '@siafoundation/react-core'
import { Commands, emptyCommands } from '../../components/Hosts/HostMap/Globe'
import { useSiaCentralHosts } from '@siafoundation/sia-central-react'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'

const defaultLimit = 50

function useHostsMain() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const { dataset: allContracts } = useContracts()
  const { autopilot } = useApp()

  const keyIn = useMemo(() => {
    let keyIn: string[] = []
    if (filters.find((f) => f.id === 'hasActiveContracts') && allContracts) {
      keyIn = allContracts.map((c) => c.hostKey)
    }
    const publicKeyEquals = filters.find((f) => f.id === 'publicKeyEquals')
    if (publicKeyEquals) {
      keyIn.push(publicKeyEquals?.value)
    }
    return keyIn.length ? keyIn : undefined
  }, [filters, allContracts])

  const autopilotResponse = useAutopilotHostsSearch({
    disabled:
      // prevents an extra fetch when allContracts is null
      (filters.find((f) => f.id === 'hasActiveContracts') && !allContracts) ||
      autopilot.status !== 'on',
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
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const regularResponse = useHostsSearch({
    disabled: autopilot.status !== 'off',
    payload: {
      limit,
      offset,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsSearchFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn:
        filters.find((f) => f.id === 'hasActiveContracts') && allContracts
          ? allContracts.map((c) => c.hostKey)
          : undefined,
    },
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
    autopilotStatus: autopilot.status,
    autopilotResponse,
    regularResponse,
    allContracts,
    allowlist,
    blocklist,
    isAllowlistActive,
    geoHosts,
    onHostSelect: onHostListClick,
  })

  const disabledCategories = useMemo(
    () => (autopilot.status === 'off' ? ['autopilot'] : []),
    [autopilot.status]
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
    autopilot.status === 'on'
      ? autopilotResponse.isValidating
      : regularResponse.isValidating
  const error =
    autopilot.status === 'on' ? autopilotResponse.error : regularResponse.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  const siascanUrl = useSiascanUrl()
  const isAutopilotConfigured = autopilot.state.data?.configured
  const tableContext = useMemo(
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
