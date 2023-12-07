import {
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  minutesInMilliseconds,
  daysInMilliseconds,
  Chart,
  formatChartData,
  computeChartStats,
  ValueScFiat,
  colors,
  getDataIntervalLabelFormatter,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import {
  useContracts as useContractsData,
  useMetricsContract,
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
  ChartContractCategory,
  ChartContractKey,
  ContractData,
  ViewMode,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useSiaCentralHosts } from '@siafoundation/react-sia-central'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { blockHeightToTime, humanSiacoin } from '@siafoundation/units'

const defaultLimit = 50

function useContractsMain() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const response = useContractsData({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
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
        setViewMode('list')
        return
      }
      setSelectedContractId(id)
      setViewMode('detail')
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

  const cellContext = useMemo(
    () => ({
      currentHeight: syncStatus.estimatedBlockHeight,
      contractsTimeRange,
      siascanUrl,
    }),
    [syncStatus.estimatedBlockHeight, contractsTimeRange, siascanUrl]
  )

  // don't use exact times, round to 5 minutes so that swr can cache
  // if the user flips back and forth between contracts.
  const start = getTimeClampedToNearest5min(selectedContract?.startTime || 0)
  const interval = daysInMilliseconds(1)
  const periods = useMemo(() => {
    const now = new Date().getTime()
    const today = getTimeClampedToNearest5min(now)
    const span = today - start
    return Math.round(span / interval)
  }, [start, interval])

  const contractMetricsResponse = useMetricsContract({
    disabled: !selectedContract,
    params: {
      start: new Date(start).toISOString(),
      interval,
      n: periods,
      contractID: selectedContract?.id,
    },
  })

  const contractMetrics = useMemo<
    Chart<ChartContractKey, ChartContractCategory>
  >(() => {
    const data = formatChartData(
      contractMetricsResponse.data
        ?.map((m) => ({
          uploadSpending: Number(m.uploadSpending),
          listSpending: Number(m.listSpending),
          deleteSpending: Number(m.deleteSpending),
          fundAccountSpending: Number(m.fundAccountSpending),
          remainingCollateral: Number(m.remainingCollateral),
          remainingFunds: Number(m.remainingFunds),
          timestamp: new Date(m.timestamp).getTime(),
        }))
        .slice(1),
      'none'
    )
    const stats = computeChartStats(data)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'remainingFunds',
          'remainingCollateral',
          'fundAccountSpending',
          'uploadSpending',
          'listSpending',
          'deleteSpending',
        ],
        enabledTip: [
          'remainingFunds',
          'remainingCollateral',
          'fundAccountSpending',
          'uploadSpending',
          'listSpending',
          'deleteSpending',
        ],
        categories: ['funding', 'spending'],
        data: {
          remainingFunds: {
            label: 'remaining funds',
            category: 'funding',
            color: colors.emerald[600],
          },
          remainingCollateral: {
            label: 'remaining collateral',
            category: 'funding',
            pattern: true,
            color: colors.emerald[600],
          },
          fundAccountSpending: {
            label: 'fund account',
            category: 'spending',
            color: colors.red[600],
          },
          uploadSpending: {
            label: 'upload',
            category: 'spending',
            color: colors.red[600],
          },
          listSpending: {
            label: 'list',
            category: 'spending',
            color: colors.red[600],
          },
          deleteSpending: {
            label: 'delete',
            category: 'spending',
            color: colors.red[600],
          },
        },
        formatComponent: function ({ value }) {
          return <ValueScFiat variant="value" value={new BigNumber(value)} />
        },
        formatTimestamp:
          interval === daysInMilliseconds(1)
            ? getDataIntervalLabelFormatter('daily')
            : undefined,
        formatTickY: (v) =>
          humanSiacoin(v, {
            fixed: 0,
            dynamicUnits: true,
          }),
        disableAnimations: true,
        chartType: 'barstack',
        curveType: 'linear',
        stackOffset: 'none',
      },
      isLoading:
        contractMetricsResponse.isValidating && !contractMetricsResponse.data,
    }
  }, [
    contractMetricsResponse.data,
    contractMetricsResponse.isValidating,
    interval,
  ])

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
    selectedContract,
    selectContract,
    contractMetrics,
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

function getTimeClampedToNearest5min(t: number) {
  const granularity = minutesInMilliseconds(5)
  return Math.round(t / granularity) * granularity
}
