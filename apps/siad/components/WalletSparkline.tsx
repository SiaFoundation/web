import React from 'react'
import {
  Box,
  ChartTimeValue,
  EntityListItemProps,
} from '@siafoundation/design-system'
import { humanNumber, humanSiacoin } from '@siafoundation/sia-js'

type Props = {
  entities: EntityListItemProps[]
}

export function WalletSparkline({ entities }: Props) {
  const sc = entities
    .map((t) => ({
      timestamp: t.timestamp,
      value: Number(t.sc),
    }))
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
  const sf = entities
    .map((t) => ({
      timestamp: t.timestamp,
      value: t.sf,
    }))
    .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
  return (
    <Box css={{ position: 'relative', margin: '$3 $5' }}>
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
