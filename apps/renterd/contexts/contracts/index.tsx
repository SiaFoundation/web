import {
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import {
  useAutopilotConfig,
  useContracts as useContractsData,
  useContractSets,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  ContractData,
  ContractTableContext,
  GraphMode,
  ViewMode,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { useContractMetrics } from './useContractMetrics'
import { useContractSetMetrics } from './useContractSetMetrics'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useDataset } from './dataset'
import { useFilteredStats } from './useFilteredStats'
import { useAutopilot } from '../app/useAutopilot'
import { daysInMilliseconds } from '@siafoundation/units'

const defaultLimit = 50

function useContractsMain() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [graphMode, setGraphMode] = useState<GraphMode>('spending')
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const response = useContractsData({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const syncStatus = useSyncStatus()
  const currentHeight = syncStatus.isSynced
    ? syncStatus.nodeBlockHeight
    : syncStatus.estimatedBlockHeight

  const [selectedContractId, setSelectedContractId] = useState<string>()
  const selectContract = useCallback(
    (id: string) => {
      if (selectedContractId === id) {
        setSelectedContractId(undefined)
        return
      }
      setSelectedContractId(id)
      setViewMode('detail')
      setGraphMode('spending')
    },
    [selectedContractId, setSelectedContractId, setViewMode]
  )

  const ap = useAutopilot()
  const isAutopilotEnabled = ap.status === 'on'
  const apConfig = useAutopilotConfig({
    disabled: !isAutopilotEnabled,
  })
  const autopilotContractSet = apConfig.data?.contracts.set
  const settingsUpload = useSettingsUpload()
  const defaultContractSet = settingsUpload.data?.defaultContractSet

  const {
    dataset,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
    hasFetchedAllPrunableSize,
  } = useDataset({ selectContract, autopilotContractSet, defaultContractSet })

  const selectedContract = useMemo(
    () => dataset?.find((d) => d.id === selectedContractId),
    [dataset, selectedContractId]
  )

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ContractData>()

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
  } = useTableState('renterd/v0/contracts', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
  })

  const datasetPage = useMemo<ContractData[] | null>(() => {
    if (!datasetFiltered) {
      return null
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, datasetPage || []),
    [currentHeight, datasetPage]
  )

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    datasetFiltered,
    response.isValidating,
    response.error,
    filters
  )

  const siascanUrl = useSiascanUrl()

  const filteredStats = useFilteredStats({ datasetFiltered })

  const cellContext = useMemo(() => {
    const context: ContractTableContext = {
      currentHeight: syncStatus.estimatedBlockHeight,
      defaultContractSet,
      autopilotContractSet,
      contractsTimeRange,
      siascanUrl,
      hasFetchedAllPrunableSize,
      isFetchingPrunableSizeAll,
      fetchPrunableSizeAll,
      filteredStats,
    }
    return context
  }, [
    syncStatus.estimatedBlockHeight,
    contractsTimeRange,
    siascanUrl,
    hasFetchedAllPrunableSize,
    isFetchingPrunableSizeAll,
    fetchPrunableSizeAll,
    filteredStats,
    defaultContractSet,
    autopilotContractSet,
  ])

  const thirtyDaysAgo = new Date().getTime() - daysInMilliseconds(30)
  const { contractMetrics: allContractsSpendingMetrics } = useContractMetrics({
    start: thirtyDaysAgo,
  })
  const { contractMetrics: selectedContractSpendingMetrics } =
    useContractMetrics({
      contractId: selectedContractId,
      start: selectedContract?.startTime || 0,
      disabled: !selectedContract,
    })
  const { contractSetMetrics: contractSetCountMetrics } =
    useContractSetMetrics()

  const contractSets = useContractSets()

  return {
    dataState,
    limit,
    offset,
    isLoading: response.isLoading,
    error: response.error,
    pageCount: datasetPage?.length || 0,
    datasetCount: dataset?.length || 0,
    datasetFilteredCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset,
    cellContext,
    datasetPage,
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
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    viewMode,
    setViewMode,
    graphMode,
    setGraphMode,
    selectedContract,
    selectContract,
    allContractsSpendingMetrics,
    selectedContractSpendingMetrics,
    contractSetCountMetrics,
    contractSets,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
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
