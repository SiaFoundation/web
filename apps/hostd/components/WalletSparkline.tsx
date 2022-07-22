import React, { useMemo } from 'react'
import { Box, ChartTimeValue, Point } from '@siafoundation/design-system'
import { humanNumber, humanSiacoin } from '@siafoundation/sia-js'
import {
  useWalletBalance,
  useWalletTransactions,
} from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export function WalletSparkline() {
  const balance = useWalletBalance()
  const transactions = useWalletTransactions()

  // TODO: add a proper endpoint for balance evolution
  const sc: Point[] = useMemo(() => {
    if (!balance.data || !transactions.data) {
      return []
    }

    const vals: { value: BigNumber; timestamp: number }[] =
      transactions.data?.reduce((acc, t, i) => {
        return acc.concat({
          value: new BigNumber(acc[i - 1]?.value || 0)
            .plus(t.Inflow)
            .minus(t.Outflow),
          timestamp: new Date(t.Timestamp).getTime(),
        })
      }, []) || []

    if (!vals.length) {
      return []
    }

    const lastVal = vals[vals.length - 1]

    const diff = lastVal.value.minus(balance.data?.siacoins)

    return vals.map((v) => ({
      value: v.value.minus(diff).toNumber(),
      timestamp: v.timestamp,
    })) as Point[]
  }, [balance, transactions])

  const sf = []

  return (
    <Box css={{ position: 'relative' }}>
      <ChartTimeValue
        datasets={[
          {
            name: 'SC',
            dataset: sc,
            formatValue: (v) => humanSiacoin(v),
          },
          {
            name: 'SF',
            dataset: sf,
            formatValue: (v) => humanNumber(v, { units: 'SF' }),
          },
        ]}
        height={300}
        hideBrush
      />
    </Box>
  )
}
