import { useCallback, useMemo, useState } from 'react'
import { Box, Button } from '../core'
import { ChartXY, ChartConfig, ChartData } from '../components'
import { getDaysInMs } from '../lib/time'
import { pick, random, times } from 'lodash'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
import { formatChartData, getTimeRangeRollup } from '../lib/chartData'
import { computeChartStats } from '../lib/chartStats'
// import {
//   useWalletBalance,
//   useWalletTransactions,
// } from '@siafoundation/react-core'

type KeyStats = {
  average: number
  change: number
  diff: number
  total: number
  latest: number
}

export type ChartStats = {
  [key: string]: KeyStats
}

export type Chart = {
  data: ChartData
  stats: ChartStats
  config: ChartConfig
}

const chartConfigs = {
  sc: {
    color: 'var(--colors-accent9)',
  },
  sf: {
    color: 'var(--colors-yellow9)',
  },
}

export function WalletSparkline() {
  // TODO: add a proper endpoint for balance evolution
  // const balance = useWalletBalance()
  // const transactions = useWalletTransactions()

  const timeRange = useMemo(
    () => ({
      start: 0,
      end: new Date().getTime(),
    }),
    []
  )

  const formatTimestamp = useCallback(
    (v: number) => getTimeRangeRollup(timeRange).label(v),
    [timeRange]
  )

  const scChart = useMemo<Chart>(() => {
    const scData = mockData.balance.map((i) => pick(i, ['sc', 'timestamp']))
    const data = formatChartData(scData, timeRange, 'total')
    const stats = computeChartStats(scData, timeRange, ['potential'])
    return {
      data,
      stats,
      config: {
        data: {
          sc: chartConfigs.sc,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp,
      },
    }
  }, [timeRange, formatTimestamp])

  const sfChart = useMemo<Chart>(() => {
    const sfData = mockData.balance.map((i) => pick(i, ['sf', 'timestamp']))
    const data = formatChartData(sfData, timeRange, 'total')
    const stats = computeChartStats(sfData, timeRange, ['potential'])
    return {
      data,
      stats,
      config: {
        data: {
          sf: chartConfigs.sf,
        },
        format: (v) => humanSiafund(v),
        formatTimestamp,
      },
    }
  }, [timeRange, formatTimestamp])

  const [toggle, setToggle] = useState<'sc' | 'sf'>('sc')

  return (
    <Box css={{ position: 'relative' }}>
      <ChartXY
        id="balance"
        height={200}
        key={toggle}
        data={toggle === 'sc' ? scChart.data : sfChart.data}
        config={toggle === 'sc' ? scChart.config : sfChart.config}
        actionsLeft={
          <>
            <Button
              variant={toggle === 'sc' ? 'accent' : 'gray'}
              onClick={() => setToggle('sc')}
            >
              Siacoins
            </Button>
            <Button
              variant={toggle === 'sf' ? 'accent' : 'gray'}
              onClick={() => setToggle('sf')}
            >
              Siafunds
            </Button>
          </>
        }
      />
    </Box>
  )
}

const count = 365 * 2

function getTimeIntervalAgo(i: number, future?: number) {
  return new Date().getTime() - getDaysInMs(1) * i + getDaysInMs(future || 0)
}

function getTimes() {
  return times(count, (i) => ({
    i,
    timestamp: getTimeIntervalAgo(i),
  }))
}

export const mockData = {
  balance: getTimes().map(({ i, timestamp }) => ({
    timestamp,
    sc:
      random(100, 200) * 1e24 +
      (i > count * 0.75 ? count - i : count / 4) * 1e24,
    sf: random(1, 4) + 1 * (count - i),
  })),
}
