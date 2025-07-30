import {
  Chart,
  formatChartData,
  computeChartStats,
  ValueScFiat,
  colors,
  getDataIntervalLabelFormatter,
} from '@siafoundation/design-system'
import { ContractMetricsParams } from '@siafoundation/renterd-types'
import { useMetricsContract } from '@siafoundation/renterd-react'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { ChartContractCategory, ChartContractKey } from './types'
import { humanSiacoin, daysInMilliseconds } from '@siafoundation/units'
import { getTimeClampedToNearest5min } from './utils'

export function useContractMetrics({
  start: _start,
  disabled,
  contractId,
}: {
  contractId?: string
  disabled?: boolean
  start: number
}) {
  // don't use exact times, round to 5 minutes so that swr can cache
  // if the user flips back and forth between contracts.
  const start = getTimeClampedToNearest5min(_start)
  const interval = daysInMilliseconds(1)
  const periods = useMemo(() => {
    const now = new Date().getTime()
    const today = getTimeClampedToNearest5min(now)
    const span = today - start
    const numberOfPeriods = Math.round(span / interval)
    return Math.max(numberOfPeriods, 1)
  }, [start, interval])

  const params = useMemo(() => {
    const p: ContractMetricsParams = {
      start: new Date(start || 0).toISOString(),
      interval,
      n: periods,
    }
    if (contractId) {
      p.contractid = contractId
    }
    return p
  }, [start, interval, periods, contractId])

  const contractMetricsResponse = useMetricsContract({
    disabled,
    params,
  })

  const contractMetrics = useMemo<
    Chart<ChartContractKey, ChartContractCategory>
  >(() => {
    const data = formatChartData(
      contractMetricsResponse.data?.map((m) => ({
        uploadSpending: Number(m.uploadSpending),
        listSpending: Number(m.listSpending),
        deleteSpending: Number(m.deleteSpending),
        fundAccountSpending: Number(m.fundAccountSpending),
        remainingCollateral: Number(m.remainingCollateral),
        remainingFunds: Number(m.remainingFunds),
        timestamp: new Date(m.timestamp).getTime(),
      })),
      'none',
    )
    const stats = computeChartStats(data)
    return {
      data,
      stats,
      config: {
        enabledGraph: [
          'remainingFunds',
          'remainingCollateral',
          'fundAccountSpending',
          'uploadSpending',
          'listSpending',
          'deleteSpending',
        ],
        enabledTip: [
          'remainingFunds',
          'remainingCollateral',
          'fundAccountSpending',
          'uploadSpending',
          'listSpending',
          'deleteSpending',
        ],
        categories: ['funding', 'spending'],
        data: {
          remainingFunds: {
            label: 'remaining funds',
            category: 'funding',
            color: colors.emerald[600],
          },
          remainingCollateral: {
            label: 'remaining collateral',
            category: 'funding',
            pattern: true,
            color: colors.emerald[600],
          },
          fundAccountSpending: {
            label: 'fund account',
            category: 'spending',
            color: colors.red[600],
          },
          uploadSpending: {
            label: 'upload',
            category: 'spending',
            color: colors.red[600],
          },
          listSpending: {
            label: 'list',
            category: 'spending',
            color: colors.red[600],
          },
          deleteSpending: {
            label: 'delete',
            category: 'spending',
            color: colors.red[600],
          },
        },
        formatComponent: function ({ value }) {
          return <ValueScFiat variant="value" value={new BigNumber(value)} />
        },
        formatTimestamp:
          interval === daysInMilliseconds(1)
            ? getDataIntervalLabelFormatter('daily')
            : undefined,
        formatTickY: (v) =>
          humanSiacoin(v, {
            fixed: 0,
            dynamicUnits: true,
          }),
        disableAnimations: true,
        chartType: 'barstack',
        curveType: 'linear',
        stackOffset: 'none',
      },
      isLoading:
        contractMetricsResponse.isValidating && !contractMetricsResponse.data,
    }
  }, [
    contractMetricsResponse.data,
    contractMetricsResponse.isValidating,
    interval,
  ])

  return {
    contractMetrics,
  }
}
