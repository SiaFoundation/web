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
import {
  formatChartData,
  getDataIntervalLabelFormatter,
} from '../lib/chartData'
import { ChartStats, computeChartStats } from '../lib/chartStats'
import BigNumber from 'bignumber.js'
import { useTheme } from '../hooks/useTheme'
import { colors } from '../config/colors'

type Transaction = {
  inflow: string
  outflow: string
  timestamp: string
}

type Props = {
  transactions?: Transaction[]
}

export function WalletSparkline({ transactions }: Props) {
  const { activeTheme } = useTheme()
  const chartConfigs = useMemo(
    () =>
      activeTheme === 'light'
        ? {
            sc: {
              color: colors.accent[800],
            },
            // sf: {
            //   color: colors.yellow[800],
            // },
          }
        : {
            sc: {
              color: colors.accentdark[800],
            },
            // sf: {
            //   color: colors.yellow[700],
            // },
          },
    [activeTheme]
  )
  const scData = useMemo(() => {
    if (!transactions || !transactions.length) {
      return []
    }
    let points = transactions.reduce((acc, t, i) => {
      const lastValue: ChartPoint = acc[i - 1]
      const lastSc = lastValue ? lastValue['sc'] : 0
      return acc.concat({
        sc: new BigNumber(lastSc).plus(t.inflow).minus(t.outflow).toNumber(),
        timestamp: new Date(t.timestamp).getTime(),
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
    const data = formatChartData(scData, timeRange, 'none', 'average', 0)
    const stats = computeChartStats(scData, timeRange)
    return {
      data,
      stats,
      config: {
        data: {
          sc: chartConfigs.sc,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp: getDataIntervalLabelFormatter('default'),
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
