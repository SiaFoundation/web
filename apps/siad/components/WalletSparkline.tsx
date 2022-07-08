import React from 'react'
import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import { Box, ChartTimeValue } from '@siafoundation/design-system'

const sc = appleStock.slice(400).map((val) => ({
  timestamp: new Date(val.date).getTime(),
  value: val.close,
}))

const sf = appleStock.slice(800, 1600).map((val) => ({
  timestamp: new Date(val.date).getTime(),
  value: val.close,
}))

export function WalletSparkline() {
  return (
    <Box css={{ margin: '$3 $5' }}>
      <ChartTimeValue
        datasets={[
          {
            name: 'SC',
            dataset: sc,
          },
          {
            name: 'SF',
            dataset: sf,
          },
        ]}
        height={200}
        hideBrush
      />
    </Box>
  )
}
