'use client'

import { useMemo } from 'react'
import { ChartXY, Chart } from '../components/ChartXY'
import { humanSiacoin } from '@siafoundation/units'
import {
  formatChartData,
  getDataIntervalLabelFormatter,
} from '../lib/chartData'
import { computeChartStats } from '../lib/chartStats'
import { useTheme } from 'next-themes'
import { colors } from '../lib/colors'

type BalanceEvolution = {
  sc: number
  timestamp: number
}

type Props = {
  balances?: BalanceEvolution[]
  isLoading: boolean
  chartType?: 'area' | 'line'
}

type Key = 'sc'

export function BalanceEvolution({
  balances,
  isLoading,
  chartType = 'area',
}: Props) {
  const { resolvedTheme } = useTheme()
  const chartConfigs = useMemo(
    () =>
      resolvedTheme === 'light'
        ? {
            sc: {
              label: 'siacoin',
              color: colors.accent[800],
            },
          }
        : {
            sc: {
              label: 'siacoin',
              color: colors.accentdark[800],
            },
          },
    [resolvedTheme]
  )

  const chart = useMemo<Chart<Key, never>>(() => {
    const data = formatChartData(balances, 'none')
    const stats = computeChartStats(balances)
    return {
      data,
      stats,
      config: {
        enabledGraph: ['sc'],
        enabledTip: ['sc'],
        data: {
          sc: chartConfigs.sc,
        },
        format: (v) => humanSiacoin(v),
        formatTimestamp: getDataIntervalLabelFormatter('default'),
        formatTickY: (v) =>
          humanSiacoin(v, {
            fixed: 0,
            dynamicUnits: true,
          }),
        disableAnimations: true,
        chartType,
      },
      isLoading,
    }
  }, [balances, isLoading, chartConfigs, chartType])

  return (
    <div className="relative">
      <ChartXY
        id="balance"
        height={200}
        allowConfiguration={false}
        data={chart.data}
        config={chart.config}
      />
    </div>
  )
}
