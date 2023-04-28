import React, { createContext, useContext } from 'react'
import {
  ChartConfig,
  ChartData,
  ChartStats,
  ChartType,
  computeChartStats,
  getDataIntervalLabelFormatter,
  MiBToBytes,
  monthsToBlocks,
  TiBToBytes,
} from '@siafoundation/design-system'
import { humanBytes, humanSiacoin } from '@siafoundation/sia-js'
import { useCallback, useMemo, useState } from 'react'
import { chartConfigs } from '../../config/charts'
import { useMetricsPeriod } from '@siafoundation/react-hostd'
import {
  getTimeRange,
  configCategoryPattern,
  configCategoryLabel,
} from './utils'
import BigNumber from 'bignumber.js'
import {
  DataInterval,
  DataTimeSpan,
  dataTimeSpanOptions,
  BandwidthKeys,
  ContractsKeys,
  PricingKeys,
  RevenueKeys,
  StorageKeys,
  BandwidthCategories,
  StorageCategories,
  RevenueCategories,
} from './types'

export type Chart<Key extends string, Cat extends string> = {
  data: ChartData<Key>
  stats: ChartStats
  config: ChartConfig<Key, Cat>
  chartType: ChartType
  isLoading: boolean
}

type TimeRange = {
  start: number
  end: number
}

// export const futureSpan = 0
export const futureSpan = 10

const defaultTimeSpan: DataTimeSpan = '90'
const defaultInterval: DataInterval = 'weekly'
const disableAnimations = true

function useMetricsMain() {
  const [dataTimeSpan, _setDataTimeSpan] =
    useState<DataTimeSpan>(defaultTimeSpan)
  const [dataInterval, setDataInterval] =
    useState<DataInterval>(defaultInterval)

  const [timeRange, setTimeRange] = useState<TimeRange>(
    getTimeRange(defaultTimeSpan, futureSpan)
  )

  const setDataTimeSpan = useCallback(
    (span: DataTimeSpan) => {
      const option = dataTimeSpanOptions.find((o) => o.value === span)
      setDataInterval(option.interval)
      _setDataTimeSpan(option.value)
      setTimeRange(getTimeRange(option.value, futureSpan))
    },
    [_setDataTimeSpan, setDataInterval, setTimeRange]
  )

  const formatTimestamp = useMemo(
    () => getDataIntervalLabelFormatter(dataInterval),
    [dataInterval]
  )

  const metricsPeriod = useMetricsPeriod({
    params: {
      period: dataInterval,
      start: new Date(timeRange.start).toISOString(),
      end: new Date(timeRange.end).toISOString(),
    },
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const revenue = useMemo<Chart<RevenueKeys, RevenueCategories>>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        storagePotential: Number(m.revenue.potential.storage),
        ingressPotential: Number(m.revenue.potential.ingress),
        egressPotential: Number(m.revenue.potential.egress),
        registryReadPotential: Number(m.revenue.potential.registryRead),
        registryWritePotential: Number(m.revenue.potential.registryWrite),
        rpcPotential: Number(m.revenue.potential.rpc),
        storage: Number(m.revenue.earned.storage),
        ingress: Number(m.revenue.earned.ingress),
        egress: Number(m.revenue.earned.egress),
        registryRead: Number(m.revenue.earned.registryRead),
        registryWrite: Number(m.revenue.earned.registryWrite),
        rpc: Number(m.revenue.earned.rpc),
        timestamp: new Date(m.timestamp).getTime(),
        // not enabled on graph, but used for stats
        potential: new BigNumber(m.revenue.potential.storage)
          .plus(m.revenue.potential.ingress)
          .plus(m.revenue.potential.egress)
          .plus(m.revenue.potential.registryRead)
          .plus(m.revenue.potential.registryWrite)
          .plus(m.revenue.potential.rpc)
          .toNumber(),
        earned: new BigNumber(m.revenue.earned.storage)
          .plus(m.revenue.earned.ingress)
          .plus(m.revenue.earned.egress)
          .plus(m.revenue.earned.registryRead)
          .plus(m.revenue.earned.registryWrite)
          .plus(m.revenue.earned.rpc)
          .toNumber(),
      })) || []
    const stats = metricsPeriod.data
      ? computeChartStats(data, timeRange, ['potential'])
      : {}
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'storage',
          'storagePotential',
          'ingress',
          'ingressPotential',
          'egress',
          'egressPotential',
          'registryRead',
          'registryReadPotential',
          'registryWrite',
          'registryWritePotential',
          'rpc',
          'rpcPotential',
        ],
        enabledTip: [
          // include the totals in the tip
          'potential',
          'earned',

          'storage',
          'storagePotential',
          'ingress',
          'ingressPotential',
          'egress',
          'egressPotential',
          'registryRead',
          'registryReadPotential',
          'registryWrite',
          'registryWritePotential',
          'rpc',
          'rpcPotential',
        ],
        categories: ['earned', 'potential'],
        data: {
          storagePotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.storage,
            'potential',
            true
          ),
          ingressPotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.ingress,
            'potential',
            true
          ),
          egressPotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.egress,
            'potential',
            true
          ),
          registryReadPotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryRead,
            'potential',
            true
          ),
          registryWritePotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryWrite,
            'potential',
            true
          ),
          rpcPotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.rpc,
            'potential',
            true
          ),

          storage: configCategoryPattern<RevenueCategories>(
            chartConfigs.storage,
            'earned'
          ),
          ingress: configCategoryPattern<RevenueCategories>(
            chartConfigs.ingress,
            'earned'
          ),
          egress: configCategoryPattern<RevenueCategories>(
            chartConfigs.egress,
            'earned'
          ),
          registryRead: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryRead,
            'earned'
          ),
          registryWrite: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryWrite,
            'earned'
          ),
          rpc: configCategoryPattern<RevenueCategories>(
            chartConfigs.rpc,
            'earned'
          ),
          earned: configCategoryLabel<RevenueCategories>({}, 'earned', 'total'),
          potential: configCategoryLabel<RevenueCategories>(
            {},
            'potential',
            'total'
          ),
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const pricing = useMemo<Chart<PricingKeys, never>>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        baseRPC: Number(m.pricing.baseRPCPrice),
        collateral: Number(m.pricing.collateral),
        contract: Number(m.pricing.contractPrice),
        egress: Number(m.pricing.egressPrice),
        ingress: Number(m.pricing.ingressPrice),
        sectorAccess: Number(m.pricing.sectorAccessPrice),
        storage: new BigNumber(m.pricing.storagePrice) // bytes/block
          .times(monthsToBlocks(1)) // bytes/month
          .times(TiBToBytes(1))
          .toNumber(),
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'storage',
          'ingress',
          'egress',
          'collateral',
          'contract',
          'sectorAccess',
          'baseRPC',
        ],
        enabledTip: [
          'storage',
          'ingress',
          'egress',
          'collateral',
          'contract',
          'sectorAccess',
          'baseRPC',
        ],
        data: {
          baseRPC: chartConfigs.rpc,
          sectorAccess: chartConfigs.sectorAccess,
          contract: chartConfigs.contract,
          collateral: chartConfigs.collateral,
          egress: chartConfigs.egress,
          ingress: chartConfigs.ingress,
          storage: chartConfigs.storage,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const contracts = useMemo<Chart<ContractsKeys, never>>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        active: m.contracts.active,
        failed: m.contracts.failed,
        pending: m.contracts.pending,
        rejected: m.contracts.rejected,
        successful: m.contracts.successful,
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange)
    return {
      data,
      stats,
      config: {
        enabledGraph: ['successful', 'active', 'pending', 'rejected', 'failed'],
        enabledTip: ['successful', 'active', 'pending', 'rejected', 'failed'],
        data: {
          active: chartConfigs.active,
          failed: chartConfigs.failed,
          pending: chartConfigs.pending,
          rejected: chartConfigs.rejected,
          successful: chartConfigs.successful,
        },
        format: (v) => `${v} contracts`,
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'areastack',
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const storage = useMemo<Chart<StorageKeys, StorageCategories>>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        totalSectors: MiBToBytes(m.storage.totalSectors).times(4).toNumber(),
        registryEntries: m.storage.registryEntries * 113,
        tempSectors: MiBToBytes(m.storage.tempSectors).times(4).toNumber(),
        physicalSectors: MiBToBytes(m.storage.physicalSectors)
          .times(4)
          .toNumber(),
        contractSectors: MiBToBytes(m.storage.contractSectors)
          .times(4)
          .toNumber(),
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'contractSectors',
          'physicalSectors',
          'tempSectors',
          'registryEntries',
          'totalSectors',
        ],
        enabledTip: [
          'contractSectors',
          'physicalSectors',
          'tempSectors',
          'registryEntries',
          'totalSectors',
        ],
        categories: ['storage used', 'storage capacity'],
        data: {
          totalSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.capacity,
            'storage capacity',
            'total'
          ),
          physicalSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.storagePhysical,
            'storage used',
            'physical'
          ),
          registryEntries: configCategoryLabel<StorageCategories>(
            chartConfigs.registry,
            'storage used',
            'registry (max)'
          ),
          tempSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.sectorsTemp,
            'storage used',
            'temp'
          ),
          contractSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.storage,
            'storage used',
            'contract'
          ),
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const bandwidth = useMemo<Chart<BandwidthKeys, BandwidthCategories>>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        egressRHP3: m.data.rhp3.egress,
        egressRHP2: m.data.rhp2.egress,
        egress: m.data.rhp3.egress + m.data.rhp2.egress,
        ingressRHP3: m.data.rhp3.ingress,
        ingressRHP2: m.data.rhp2.ingress,
        ingress: m.data.rhp3.ingress + m.data.rhp2.ingress,
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'ingress',
          'ingressRHP2',
          'ingressRHP3',
          'egress',
          'egressRHP2',
          'egressRHP3',
        ],
        enabledTip: [
          'ingress',
          'ingressRHP2',
          'ingressRHP3',
          'egress',
          'egressRHP2',
          'egressRHP3',
        ],
        categories: ['ingress', 'egress'],
        data: {
          ingress: configCategoryLabel<BandwidthCategories>(
            chartConfigs.ingress,
            'ingress',
            'total'
          ),
          ingressRHP2: configCategoryLabel<BandwidthCategories>(
            chartConfigs.ingress,
            'ingress',
            'RHP2'
          ),
          ingressRHP3: configCategoryLabel<BandwidthCategories>(
            chartConfigs.ingress,
            'ingress',
            'RHP3'
          ),
          egress: configCategoryLabel<BandwidthCategories>(
            chartConfigs.egress,
            'egress',
            'total'
          ),
          egressRHP2: configCategoryLabel<BandwidthCategories>(
            chartConfigs.egress,
            'egress',
            'RHP2'
          ),
          egressRHP3: configCategoryLabel<BandwidthCategories>(
            chartConfigs.egress,
            'egress',
            'RHP3'
          ),
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  return {
    dataTimeSpan,
    setDataTimeSpan,
    timeRange,
    dataInterval,
    setDataInterval,
    revenue,
    contracts,
    storage,
    pricing,
    bandwidth,
  }
}

type State = ReturnType<typeof useMetricsMain>

const MetricsContext = createContext({} as State)
export const useMetrics = () => useContext(MetricsContext)

type Props = {
  children: React.ReactNode
}

export function MetricsProvider({ children }: Props) {
  const state = useMetricsMain()
  return (
    <MetricsContext.Provider value={state}>{children}</MetricsContext.Provider>
  )
}
