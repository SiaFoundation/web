import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, ChartXY } from '@siafoundation/design-system'
import { humanSiacoin, humanSiafund } from '@siafoundation/sia-js'
// import {
//   useWalletBalance,
//   useWalletTransactions,
// } from '@siafoundation/react-core'
import { Chart } from '../contexts/data'
import { formatData, getTimeRangeRollup } from '../contexts/data/formatData'
import { mockData } from '../contexts/data/mockData'
import { computeStats } from '../contexts/data/computeStats'
import { chartConfigs } from '../config/charts'
import { pick } from 'lodash'

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
    const data = formatData(scData, timeRange, 'total')
    const stats = computeStats(scData, timeRange, ['potential'])
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
    const data = formatData(sfData, timeRange, 'total')
    const stats = computeStats(sfData, timeRange, ['potential'])
    return {
      data,
      stats,
      config: {
        data: {
          sc: chartConfigs.sc,
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
