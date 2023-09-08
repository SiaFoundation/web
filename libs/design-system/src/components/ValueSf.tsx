'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { humanNumber } from '@siafoundation/sia-js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: number
  variant?: 'change' | 'value'
  tooltip?: string
}

export function ValueSf({
  value,
  size,
  scaleSize,
  tooltip = '',
  variant = 'change',
}: Props) {
  const formattedValue = humanNumber(String(value), {
    units: 'SF',
  })

  return (
    <Tooltip content={(tooltip ? `${tooltip} ` : '') + formattedValue}>
      <Text
        size={size}
        scaleSize={scaleSize}
        weight="medium"
        font="mono"
        color={
          variant === 'change'
            ? value > 0
              ? 'green'
              : value < 0
              ? 'red'
              : 'subtle'
            : 'contrast'
        }
      >
        {variant === 'change' && value > 0 ? '+' : ''}
        {formattedValue}
      </Text>
    </Tooltip>
  )
}
