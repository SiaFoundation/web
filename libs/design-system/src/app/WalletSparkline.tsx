import { useMemo } from 'react'
import {
  ChartXY,
  ChartPoint,
  ChartData,
  ChartConfig,
} from '../components/ChartXY'
import { getDaysInMs } from '../lib/time'
import { sortBy } from 'lodash'
import { humanSiacoin } from '@siafoundation/sia-js'
import { formatChartData, timeRangeNoRollup } from '../lib/chartData'
import { ChartStats, computeChartStats } from '../lib/chartStats'
import { useWalletTransactions } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { useTheme } from '../hooks/useTheme'
import { colors } from '../config/colors'

export function WalletSparkline() {
  const { activeTheme } = useTheme()
  const chartConfigs = useMemo(
    () =>
      activeTheme === 'light'
        ? {
            sc: {
              color: colors.accent[800],
            },
            sf: {
              color: colors.yellow[800],
            },
          }
        : {
            sc: {
              color: colors.accentdark[800],
            },
            sf: {
              color: colors.yellow[700],
            },
          },
    [activeTheme]
  )
  const transactions = useWalletTransactions({
    params: {
      since: undefined,
      max: undefined,
    },
  })

  const scData = useMemo(() => {
    if (!transactions.data || !transactions.data.length) {
      return []
    }
    let points = transactions.data.reduce((acc, t, i) => {
      const lastValue = acc[i - 1]
      const lastSc = lastValue ? lastValue['sc'] : 0
      return acc.concat({
        sc: new BigNumber(lastSc).plus(t.Inflow).minus(t.Outflow).toNumber(),
        timestamp: new Date(t.Timestamp).getTime(),
      })
    }, [] as ChartPoint[])
    points = sortBy(points, 'timestamp')

    // Pad the back with a few points so the intial transaction shows as a jump up from zero.
    const firstTimestamp = points[0].timestamp
    for (let i = 0; i < 5; i++) {
      points.unshift({
        sc: 0,
        timestamp: firstTimestamp - getDaysInMs(i),
      })
    }
    // Pad the front with current time.
    points.push({
      sc: points[points.length - 1]['sc'],
      timestamp: new Date().getTime(),
    })
    return points
  }, [transactions])

  const timeRange = useMemo(
    () => ({
      start: scData?.length ? scData[0].timestamp : 0,
      end: scData?.length ? scData[scData.length - 1].timestamp : 0,
    }),
    [scData]
  )

  const scChart = useMemo<{
    data: ChartData
    stats: ChartStats
    config: ChartConfig
  }>(() => {
    const data = formatChartData(scData, timeRange, 'none', 0)
    const stats = computeChartStats(scData, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          sc: chartConfigs.sc,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp: timeRangeNoRollup.label,
      },
    }
  }, [scData, timeRange, chartConfigs])

  return (
    <div className="relative">
      <ChartXY
        id="balance"
        height={200}
        data={scChart.data}
        config={scChart.config}
      />
    </div>
  )
}
