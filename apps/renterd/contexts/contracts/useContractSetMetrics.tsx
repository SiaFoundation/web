import {
  daysInMilliseconds,
  Chart,
  formatChartData,
  computeChartStats,
  colors,
  getDataIntervalLabelFormatter,
} from '@siafoundation/design-system'
import {
  useAutopilotConfig,
  useMetricsContractSet,
} from '@siafoundation/renterd-react'
import { useMemo } from 'react'
import { ChartContractSetCategory, ChartContractSetKey } from './types'
import { getTimeClampedToNearest5min } from './utils'

export function useContractSetMetrics() {
  // don't use exact times, round to 5 minutes so that swr can cache
  // if the user flips back and forth between contracts.
  const start = getTimeClampedToNearest5min(
    new Date().getTime() - daysInMilliseconds(30)
  )
  const interval = daysInMilliseconds(1)
  const periods = useMemo(() => {
    const now = new Date().getTime()
    const today = getTimeClampedToNearest5min(now)
    const span = today - start
    return Math.round(span / interval)
  }, [start, interval])

  const config = useAutopilotConfig()
  const response = useMetricsContractSet({
    disabled: !config.data,
    params: {
      name: config.data?.contracts.set,
      start: new Date(start).toISOString(),
      interval,
      n: periods,
    },
  })

  const contractSetMetrics = useMemo<
    Chart<ChartContractSetKey, ChartContractSetCategory>
  >(() => {
    const data = formatChartData(
      response.data?.map((m) => ({
        contracts: Number(m.contracts),
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'none'
    )
    const stats = computeChartStats(data)
    return {
      data,
      stats,
      config: {
        enabledGraph: ['contracts'],
        enabledTip: ['contracts'],
        data: {
          contracts: {
            label: 'contracts',
            color: colors.emerald[600],
          },
        },
        // formatComponent: function ({ value }) {
        //   return <ValueScFiat variant="value" value={new BigNumber(value)} />
        // },
        formatTimestamp:
          interval === daysInMilliseconds(1)
            ? getDataIntervalLabelFormatter('daily')
            : undefined,
        // formatTickY: (v) => `${v} contracts`,
        disableAnimations: true,
        chartType: 'line',
        curveType: 'linear',
        stackOffset: 'none',
      },
      isLoading: response.isValidating && !response.data,
    }
  }, [response.data, response.isValidating, interval])

  return {
    contractSetMetrics,
  }
}
