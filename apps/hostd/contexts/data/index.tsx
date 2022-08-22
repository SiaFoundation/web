import React, { createContext, useContext } from 'react'
import { ChartConfig, ChartData } from '@siafoundation/design-system'
import { humanBytes, humanSiacoin } from '@siafoundation/sia-js'
import { throttle } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { chartConfigs } from '../../config/charts'
import { getDaysInMs } from '@siafoundation/design-system'
import { mockData } from './mockData'
import { ChartStats, computeStats } from './computeStats'
import { formatData } from './formatData'

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

const defaultTimeSpan: TimeSpan = 90
export const futureSpan = 90

const DataContext = createContext({} as State)
export const useData = () => useContext(DataContext)

type State = {
  timeSpan: TimeSpan
  setTimeSpan: (timeSpan: TimeSpan) => void
  timeRange: TimeRange
  setTimeRange: (range: TimeRange) => void
  revenue: Chart
  collateral: Chart
  contracts: Chart
  storage: Chart
  pricing: Chart
  bandwidth: Chart
}

type Props = {
  children: React.ReactNode
}

function getTimeRange(span: TimeSpan) {
  const now = new Date().getTime()
  if (span === 'all') {
    return {
      start: 0,
      end: now,
    }
  }
  return {
    start: now - getDaysInMs(span),
    end: now + getDaysInMs(futureSpan),
  }
}

export function DataProvider({ children }: Props) {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>(defaultTimeSpan)

  const [timeRange, _setTimeRange] = useState<TimeRange>(
    getTimeRange(defaultTimeSpan)
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
    setTimeRange(getTimeRange(timeSpan))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSpan])

  const revenue = useMemo<Chart>(() => {
    const data = formatData(mockData.revenue, timeRange, 'total')
    const stats = computeStats(mockData.revenue, timeRange, ['potential'])
    return {
      data,
      stats,
      config: {
        data: {
          storage: chartConfigs.storage,
          egress: chartConfigs.egress,
          ingress: chartConfigs.ingress,
          registry: chartConfigs.registry,
          other: chartConfigs.other,
          potential: chartConfigs.potential,
          lost: chartConfigs.failed,
        },
        format: (v) => humanSiacoin(v),
      },
    }
  }, [timeRange])

  const pricing = useMemo<Chart>(() => {
    const data = formatData(mockData.pricing, timeRange, 'average')
    const stats = computeStats(mockData.pricing, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          contract: chartConfigs.contract,
          storage: chartConfigs.storage,
          egress: chartConfigs.egress,
          ingress: chartConfigs.ingress,
        },
        format: (v) => humanSiacoin(v),
      },
    }
  }, [timeRange])

  const collateral = useMemo<Chart>(() => {
    const data = formatData(mockData.collateral, timeRange, 'average')
    const stats = computeStats(mockData.collateral, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          locked: chartConfigs.locked,
          risked: chartConfigs.risked,
          burnt: chartConfigs.burnt,
        },
        format: (v) => humanSiacoin(v),
      },
    }
  }, [timeRange])

  const contracts = useMemo<Chart>(() => {
    const data = formatData(mockData.contracts, timeRange, 'average')
    const stats = computeStats(mockData.contracts, timeRange)
    return {
      data,
      stats,
      config: {
        enabled: {
          successful: true,
          failed: true,
          expiring: true,
        },
        data: {
          successful: chartConfigs.successful,
          failed: chartConfigs.failed,
          expiring: chartConfigs.expiring,
        },
        format: (v) => `${v} contracts`,
      },
    }
  }, [timeRange])

  const storage = useMemo<Chart>(() => {
    const data = formatData(mockData.storage, timeRange, 'average')
    const stats = computeStats(mockData.storage, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          storage: chartConfigs.storage,
          registry: chartConfigs.registry,
        },
        format: (v) => humanBytes(v),
      },
    }
  }, [timeRange])

  const bandwidth = useMemo<Chart>(() => {
    const data = formatData(mockData.bandwidth, timeRange, 'total')
    const stats = computeStats(mockData.bandwidth, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          ingress: chartConfigs.ingress,
          egress: chartConfigs.egress,
        },
        format: (v) => humanBytes(v),
      },
    }
  }, [timeRange])

  const value: State = {
    timeSpan,
    setTimeSpan,
    timeRange,
    setTimeRange,
    revenue,
    collateral,
    contracts,
    storage,
    pricing,
    bandwidth,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
