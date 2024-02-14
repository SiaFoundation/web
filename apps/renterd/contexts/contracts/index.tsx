import {
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  daysInMilliseconds,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import {
  useContracts as useContractsData,
  useContractSets,
} from '@siafoundation/react-renterd'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import BigNumber from 'bignumber.js'
import {
  ContractData,
  GraphMode,
  ViewMode,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useSiaCentralHosts } from '@siafoundation/react-sia-central'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { blockHeightToTime } from '@siafoundation/units'
import { useContractMetrics } from './useContractMetrics'
import { useContractSetMetrics } from './useContractSetMetrics'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { defaultDatasetRefreshInterval } from '../../config/swr'

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
  const geo = useSiaCentralHosts()
  const geoHosts = useMemo(() => geo.data?.hosts || [], [geo.data])

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
  const dataset = useMemo<ContractData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: ContractData[] =
      response.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          'fcid:0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        const endHeight = c.windowStart
        const endTime = blockHeightToTime(currentHeight, endHeight)
        return {
          id: c.id,
          onClick: () => selectContract(c.id),
          contractId: c.id,
          state: c.state,
          hostIp: c.hostIP,
          hostKey: c.hostKey,
          contractSets: c.contractSets,
          location: geoHosts.find((h) => h.public_key === c.hostKey)?.location,
          timeline: startTime,
          startTime,
          endTime,
          contractHeightStart: c.startHeight,
          contractHeightEnd: endHeight,
          proofWindowHeightStart: c.windowStart,
          proofWindowHeightEnd: c.windowEnd,
          proofHeight: c.proofHeight,
          revisionHeight: c.revisionHeight,
          isRenewed,
          renewedFrom: c.renewedFrom,
          totalCost: new BigNumber(c.totalCost),
          spendingUploads: new BigNumber(c.spending.uploads),
          spendingDownloads: new BigNumber(c.spending.downloads),
          spendingFundAccount: new BigNumber(c.spending.fundAccount),
          size: new BigNumber(c.size),
        }
      }) || []
    return data
  }, [response.data, geoHosts, currentHeight, selectContract])

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

  const contractSetSettings = useContractSetSettings()
  const cellContext = useMemo(
    () => ({
      currentHeight: syncStatus.estimatedBlockHeight,
      defaultSet: contractSetSettings.data?.default,
      contractsTimeRange,
      siascanUrl,
    }),
    [
      syncStatus.estimatedBlockHeight,
      contractsTimeRange,
      siascanUrl,
      contractSetSettings.data,
    ]
  )

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
