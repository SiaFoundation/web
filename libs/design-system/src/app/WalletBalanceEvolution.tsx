import { useMemo } from 'react'
import { ChartXY, Chart } from '../components/ChartXY'
import { humanSiacoin } from '@siafoundation/sia-js'
import {
  formatChartData,
  getDataIntervalLabelFormatter,
} from '../lib/chartData'
import { computeChartStats } from '../lib/chartStats'
import { useTheme } from '../hooks/useTheme'
import { colors } from '../config/colors'

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
  const { activeTheme } = useTheme()
  const chartConfigs = useMemo(
    () =>
      activeTheme === 'light'
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
    [activeTheme]
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
        disableAnimations: true,
      },
      chartType,
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
        chartType={chart.chartType}
      />
    </div>
  )
}
