import React, { createContext, useContext } from 'react'
import {
  ChartConfig,
  ChartData,
  ChartStats,
  computeChartStats,
  monthsToBlocks,
  TiBToBytes,
  timeRangeNoRollup,
} from '@siafoundation/design-system'
import { humanBytes, humanSiacoin } from '@siafoundation/sia-js'
import { throttle } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { chartConfigs } from '../../config/charts'
import { useMetricsPeriod } from '@siafoundation/react-hostd'
import { getTimeRange } from './utils'
import BigNumber from 'bignumber.js'

const debounced = throttle((func: () => void) => func(), 100, {
  trailing: true,
})

export type Chart = {
  data: ChartData
  stats: ChartStats
  config: ChartConfig
}

type TimeRange = {
  start: number
  end: number
}

export type TimeSpan = 7 | 30 | 90 | 365 | 'all'

// export const futureSpan = 0
export const futureSpan = 10

const defaultTimeSpan: TimeSpan = 90

function useMetricsMain() {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>(defaultTimeSpan)

  const [timeRange, _setTimeRange] = useState<TimeRange>(
    getTimeRange(defaultTimeSpan, futureSpan)
  )

  const setTimeRange = useCallback(
    (range: TimeRange) => {
      if (range.start === 0 && range.end === 0) {
        return
      }
      debounced(() => _setTimeRange(range))
    },
    [_setTimeRange]
  )

  useEffect(() => {
    setTimeRange(getTimeRange(timeSpan, futureSpan))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSpan])

  const formatTimestamp = useCallback(
    (v: number) => timeRangeNoRollup.label(v),
    []
  )
  const interval = 'daily'
  const metricsPeriod = useMetricsPeriod({
    params: {
      period: interval,
      start: new Date(timeRange.start).toISOString(),
      end: new Date(timeRange.end).toISOString(),
    },
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  const revenue = useMemo<Chart>(() => {
    // const data = formatChartData(mockData.revenue, timeRange, 'auto', 'total')
    const data =
      metricsPeriod.data?.map((m) => ({
        storagePotential: Number(m.revenue.potential.storage),
        ingressPotential: Number(m.revenue.potential.ingress),
        egressPotential: Number(m.revenue.potential.egress),
        registryReadPotential: Number(m.revenue.potential.registryRead),
        registryWritePotential: Number(m.revenue.potential.registryWrite),
        rpcPotential: Number(m.revenue.potential.rpc),
        potential: new BigNumber(m.revenue.potential.storage)
          .plus(m.revenue.potential.ingress)
          .plus(m.revenue.potential.egress)
          .plus(m.revenue.potential.registryRead)
          .plus(m.revenue.potential.registryWrite)
          .plus(m.revenue.potential.rpc)
          .toNumber(),
        storage: Number(m.revenue.earned.storage),
        ingress: Number(m.revenue.earned.ingress),
        egress: Number(m.revenue.earned.egress),
        registryRead: Number(m.revenue.earned.registryRead),
        registryWrite: Number(m.revenue.earned.registryWrite),
        rpc: Number(m.revenue.earned.rpc),
        earned: new BigNumber(m.revenue.earned.storage)
          .plus(m.revenue.earned.ingress)
          .plus(m.revenue.earned.egress)
          .plus(m.revenue.earned.registryRead)
          .plus(m.revenue.earned.registryWrite)
          .plus(m.revenue.earned.rpc)
          .toNumber(),
        timestamp: new Date(m.timestamp).getTime(),
      })) || []
    const stats = computeChartStats(data, timeRange, ['potential'])
    return {
      data,
      stats,
      config: {
        data: {
          storagePotential: potentialConfig(chartConfigs.storage),
          ingressPotential: potentialConfig(chartConfigs.ingress),
          egressPotential: potentialConfig(chartConfigs.egress),
          registryReadPotential: potentialConfig(chartConfigs.registryRead),
          registryWritePotential: potentialConfig(chartConfigs.registryWrite),
          rpcPotential: potentialConfig(chartConfigs.rpc),

          storage: chartConfigs.storage,
          ingress: chartConfigs.ingress,
          egress: chartConfigs.egress,
          registryRead: chartConfigs.registryRead,
          registryWrite: chartConfigs.registryWrite,
          rpc: chartConfigs.rpc,
          // potential: chartConfigs.potential,
          // lost: chartConfigs.failed,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
      },
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const pricing = useMemo<Chart>(() => {
    // const data = formatChartData(mockData.pricing, timeRange, 'auto', 'average')
    const data =
      metricsPeriod.data?.map((m) => ({
        // TODO: potential revenue
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
      },
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const contracts = useMemo<Chart>(() => {
    // const data = formatChartData(
    //   mockData.contracts,
    //   timeRange,
    //   'auto',
    //   'average'
    // )
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
      },
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const storage = useMemo<Chart>(() => {
    // const data = formatChartData(mockData.storage, timeRange, 'auto', 'average')
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
          totalSectors: chartConfigs.sectorAccess,
          physicalSectors: chartConfigs.sectorsPhysical,
          registryEntries: chartConfigs.registry,
          tempSectors: chartConfigs.sectorsTemp,
          contractSectors: chartConfigs.sectorsContract,
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
      },
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  const bandwidth = useMemo<Chart>(() => {
    // const data = formatChartData(mockData.bandwidth, timeRange, 'auto', 'total')
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
          ingress: chartConfigs.ingress,
          ingressRHP2: {
            ...chartConfigs.ingress,
            label: 'ingress RHP2',
          },
          ingressRHP3: {
            ...chartConfigs.ingress,
            label: 'ingress RHP3',
          },
          egress: chartConfigs.egress,
          egressRHP2: {
            ...chartConfigs.egress,
            label: 'egress RHP2',
          },
          egressRHP3: {
            ...chartConfigs.egress,
            label: 'egress RHP3',
          },
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
      },
    }
  }, [timeRange, metricsPeriod, formatTimestamp])

  return {
    timeSpan,
    setTimeSpan,
    timeRange,
    setTimeRange,
    revenue,
    contracts,
    storage,
    pricing,
    bandwidth,
    interval,
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

function potentialConfig(config: { label: string; color: string }) {
  return {
    ...config,
    label: `${config.label} - potential`,
    pattern: true,
  }
}

function modifyConfigLabel(
  config: { label: string; color: string },
  text: string
) {
  return {
    ...config,
    label: `${config.label} - ${text}`,
  }
}
