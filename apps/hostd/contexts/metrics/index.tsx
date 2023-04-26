import React, { createContext, useContext } from 'react'
import {
  ChartConfig,
  ChartData,
  ChartStats,
  computeChartStats,
  getDataIntervalLabelFormatter,
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
import { DataInterval, DataTimeSpan, dataTimeSpanOptions } from './types'

export type Chart = {
  data: ChartData
  stats: ChartStats
  config: ChartConfig
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

  const revenue = useMemo<Chart>(() => {
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
        enabled: {
          storagePotential: true,
          ingressPotential: true,
          egressPotential: true,
          registryReadPotential: true,
          registryWritePotential: true,
          rpcPotential: true,
          storage: true,
          ingress: true,
          egress: true,
          registryRead: true,
          registryWrite: true,
          rpc: true,
        },
        data: {
          storagePotential: configCategoryPattern(
            chartConfigs.storage,
            'potential',
            true
          ),
          ingressPotential: configCategoryPattern(
            chartConfigs.ingress,
            'potential',
            true
          ),
          egressPotential: configCategoryPattern(
            chartConfigs.egress,
            'potential',
            true
          ),
          registryReadPotential: configCategoryPattern(
            chartConfigs.registryRead,
            'potential',
            true
          ),
          registryWritePotential: configCategoryPattern(
            chartConfigs.registryWrite,
            'potential',
            true
          ),
          rpcPotential: configCategoryPattern(
            chartConfigs.rpc,
            'potential',
            true
          ),

          storage: configCategoryPattern(chartConfigs.storage, 'earned'),
          ingress: configCategoryPattern(chartConfigs.ingress, 'earned'),
          egress: configCategoryPattern(chartConfigs.egress, 'earned'),
          registryRead: configCategoryPattern(
            chartConfigs.registryRead,
            'earned'
          ),
          registryWrite: configCategoryPattern(
            chartConfigs.registryWrite,
            'earned'
          ),
          rpc: configCategoryPattern(chartConfigs.rpc, 'earned'),
          // potential: chartConfigs.potential,
          // lost: chartConfigs.failed,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
        disableAnimations,
      },
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const pricing = useMemo<Chart>(() => {
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
        data: {
          baseRPC: chartConfigs.rpc,
          collateral: chartConfigs.collateral,
          contract: chartConfigs.contract,
          egress: chartConfigs.egress,
          ingress: chartConfigs.ingress,
          sectorAccess: chartConfigs.sectorAccess,
          storage: chartConfigs.storage,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
        disableAnimations,
      },
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const contracts = useMemo<Chart>(() => {
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
        enabled: {
          active: true,
          failed: true,
          pending: true,
          rejected: true,
          successful: true,
        },
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
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const storage = useMemo<Chart>(() => {
    const data =
      metricsPeriod.data?.map((m) => ({
        totalSectors: m.storage.totalSectors,
        physicalSectors: m.storage.physicalSectors,
        registryEntries: m.storage.registryEntries,
        tempSectors: m.storage.tempSectors,
        contractSectors: m.storage.contractSectors,
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          totalSectors: chartConfigs.sectorsTotal,
          physicalSectors: chartConfigs.sectorsPhysical,
          registryEntries: chartConfigs.registry,
          tempSectors: chartConfigs.sectorsTemp,
          contractSectors: chartConfigs.sectorsContract,
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
        disableAnimations,
      },
      isLoading: metricsPeriod.isValidating,
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const bandwidth = useMemo<Chart>(() => {
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
        data: {
          ingress: configCategoryLabel(
            chartConfigs.ingress,
            'ingress',
            'ingress total'
          ),
          ingressRHP2: configCategoryLabel(
            chartConfigs.ingress,
            'ingress',
            'RHP2'
          ),
          ingressRHP3: configCategoryLabel(
            chartConfigs.ingress,
            'ingress',
            'RHP3'
          ),
          egress: configCategoryLabel(chartConfigs.egress, 'egress', 'total'),
          egressRHP2: configCategoryLabel(
            chartConfigs.egress,
            'egress',
            'RHP2'
          ),
          egressRHP3: configCategoryLabel(
            chartConfigs.egress,
            'egress',
            'RHP3'
          ),
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
        disableAnimations,
      },
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
