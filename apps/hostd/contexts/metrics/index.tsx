import React, { createContext, useContext } from 'react'
import {
  Chart,
  computeChartStats,
  formatChartData,
  getDataIntervalLabelFormatter,
  getTimeRange,
  MiBToBytes,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber, humanSiacoin } from '@siafoundation/sia-js'
import { useCallback, useMemo } from 'react'
import { chartConfigs } from '../../config/charts'
import { useMetricsPeriod } from '@siafoundation/react-hostd'
import { configCategoryPattern, configCategoryLabel } from './utils'
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
  OperationsKeys,
} from './types'
import { formatISO } from 'date-fns'
import {
  humanBaseRpcPrice,
  humanCollateralPrice,
  humanEgressPrice,
  humanIngressPrice,
  humanSectorAccessPrice,
  humanStoragePrice,
} from '../../lib/humanUnits'
import useLocalStorageState from 'use-local-storage-state'

type TimeRange = {
  start: number
  end: number
}

const defaultTimeSpan = dataTimeSpanOptions.find((o) => o.value === '7')
const disableAnimations = true

// TODO: does not reach current time
// function getPeriods(timeRange: TimeRange, dataInterval: DataInterval) {
//   const intervalMs = getDataIntervalInMs(dataInterval)
//   if (!intervalMs) {
//     return 0
//   }
//   return Math.ceil((timeRange.end - timeRange.start) / intervalMs) + 1
// }

function useMetricsMain() {
  const [dataTimeSpan, _setDataTimeSpan] = useLocalStorageState<DataTimeSpan>(
    'v0/metrics/dataTimeSpan',
    {
      defaultValue: defaultTimeSpan.value,
    }
  )
  const [dataInterval, setDataInterval] = useLocalStorageState<DataInterval>(
    'v0/metrics/dataInterval',
    {
      defaultValue: defaultTimeSpan.interval,
    }
  )

  const [timeRange, setTimeRange] = useLocalStorageState<TimeRange>(
    'v0/metrics/timeRange',
    {
      defaultValue: getTimeRange(dataTimeSpan),
    }
  )

  const setDataTimeSpan = useCallback(
    (span: DataTimeSpan) => {
      const option = dataTimeSpanOptions.find((o) => o.value === span)
      setDataInterval(option.interval)
      _setDataTimeSpan(option.value)
      setTimeRange(getTimeRange(option.value))
    },
    [_setDataTimeSpan, setDataInterval, setTimeRange]
  )

  const formatTimestamp = useMemo(
    () => getDataIntervalLabelFormatter(dataInterval),
    [dataInterval]
  )

  const metricsPeriod = useMetricsPeriod({
    params: {
      interval: dataInterval,
      start: formatISO(new Date(timeRange.start)),
      // periods: getPeriods(timeRange, dataInterval),
    },
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const revenue = useMemo<Chart<RevenueKeys, RevenueCategories>>(() => {
    const data = formatChartData(
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
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'diff'
    )
    const stats = computeChartStats(data)
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
            chartConfigs.registryReads,
            'potential',
            true
          ),
          registryWritePotential: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryWrites,
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
            chartConfigs.registryReads,
            'earned'
          ),
          registryWrite: configCategoryPattern<RevenueCategories>(
            chartConfigs.registryWrites,
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
  }, [metricsPeriod, formatTimestamp])

  const pricing = useMemo<Chart<PricingKeys, never>>(() => {
    const data = formatChartData(
      metricsPeriod.data?.map((m) => ({
        baseRPC: humanBaseRpcPrice(m.pricing.baseRPCPrice).toNumber(),
        collateral: humanCollateralPrice(m.pricing.collateral).toNumber(),
        contract: Number(m.pricing.contractPrice),
        egress: humanEgressPrice(m.pricing.egressPrice).toNumber(),
        ingress: humanIngressPrice(m.pricing.ingressPrice).toNumber(),
        sectorAccess: humanSectorAccessPrice(
          m.pricing.sectorAccessPrice
        ).toNumber(),
        storage: humanStoragePrice(m.pricing.storagePrice).toNumber(),
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'none'
    )
    const stats = computeChartStats(data)
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
  }, [metricsPeriod, formatTimestamp])

  const contracts = useMemo<Chart<ContractsKeys, never>>(() => {
    const data = formatChartData(
      metricsPeriod.data?.map((m) => ({
        active: m.contracts.active,
        failed: m.contracts.failed,
        pending: m.contracts.pending,
        rejected: m.contracts.rejected,
        successful: m.contracts.successful,
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'none'
    )
    const stats = computeChartStats(data)
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
  }, [metricsPeriod, formatTimestamp])

  const storage = useMemo<Chart<StorageKeys, StorageCategories>>(() => {
    const data = formatChartData(
      metricsPeriod.data?.map((m) => ({
        maxSectors: MiBToBytes(m.storage.totalSectors).times(4).toNumber(),
        registryEntries: m.registry.entries * 113,
        maxRegistryEntries: m.registry.maxEntries * 113,
        tempSectors: MiBToBytes(m.storage.tempSectors).times(4).toNumber(),
        physicalSectors: MiBToBytes(m.storage.physicalSectors)
          .times(4)
          .toNumber(),
        contractSectors: MiBToBytes(m.storage.contractSectors)
          .times(4)
          .toNumber(),
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'none'
    )
    const stats = computeChartStats(data)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'contractSectors',
          'physicalSectors',
          'tempSectors',
          'registryEntries',
          'maxSectors',
          'maxRegistryEntries',
        ],
        enabledTip: [
          'contractSectors',
          'physicalSectors',
          'tempSectors',
          'registryEntries',
          'maxSectors',
          'maxRegistryEntries',
        ],
        categories: ['storage used', 'storage capacity'],
        data: {
          maxSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.capacityStorage,
            'storage capacity',
            'sectors'
          ),
          maxRegistryEntries: configCategoryLabel<StorageCategories>(
            chartConfigs.capacityRegistry,
            'storage capacity',
            'registry'
          ),
          physicalSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.storagePhysical,
            'storage used',
            'sectors physical'
          ),
          registryEntries: configCategoryLabel<StorageCategories>(
            chartConfigs.registry,
            'storage used',
            'registry (max)'
          ),
          tempSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.sectorsTemp,
            'storage used',
            'sectors temp'
          ),
          contractSectors: configCategoryLabel<StorageCategories>(
            chartConfigs.storage,
            'storage used',
            'sectors contract'
          ),
        },
        format: (v) => humanBytes(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [metricsPeriod, formatTimestamp])

  const operations = useMemo<Chart<OperationsKeys, never>>(() => {
    const data = formatChartData(
      metricsPeriod.data?.map((m) => ({
        storageReads: m.storage.reads,
        storageWrites: m.storage.writes,
        registryReads: m.registry.reads,
        registryWrites: m.registry.writes,
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'diff'
    )
    const stats = computeChartStats(data)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'storageReads',
          'storageWrites',
          'registryReads',
          'registryWrites',
        ],
        enabledTip: [
          'storageReads',
          'storageWrites',
          'registryReads',
          'registryWrites',
        ],
        data: {
          registryReads: chartConfigs.registryReads,
          registryWrites: chartConfigs.registryWrites,
          storageReads: chartConfigs.storageReads,
          storageWrites: chartConfigs.storageWrites,
        },
        format: (v) => humanNumber(v),
        formatTimestamp,
        disableAnimations,
      },
      chartType: 'line',
      isLoading: metricsPeriod.isValidating,
    }
  }, [metricsPeriod, formatTimestamp])

  const bandwidth = useMemo<Chart<BandwidthKeys, BandwidthCategories>>(() => {
    const data = formatChartData(
      metricsPeriod.data?.map((m) => ({
        egressRHP3: m.data.rhp3.egress,
        egressRHP2: m.data.rhp2.egress,
        egress: m.data.rhp3.egress + m.data.rhp2.egress,
        ingressRHP3: m.data.rhp3.ingress,
        ingressRHP2: m.data.rhp2.ingress,
        ingress: m.data.rhp3.ingress + m.data.rhp2.ingress,
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'diff'
    )
    const stats = computeChartStats(data)
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
  }, [metricsPeriod, formatTimestamp])

  return {
    dataTimeSpan,
    setDataTimeSpan,
    timeRange,
    dataInterval,
    setDataInterval,
    operations,
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
