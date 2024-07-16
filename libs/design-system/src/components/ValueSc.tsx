'use client'

import { humanSiacoin } from '@siafoundation/units'
import type BigNumber from 'bignumber.js'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  fixed?: number
  color?: React.ComponentProps<typeof Text>['color']
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
}

export function ValueSc({
  value,
  size,
  scaleSize,
  tooltip = '',
  tipSide,
  variant = 'change',
  color: customColor,
  fixed = 3,
  dynamicUnits = true,
  hastingUnits = true,
  extendedSuffix,
  showTooltip = true,
}: Props) {
  const sign = value.isGreaterThan(0) ? '+' : value.isLessThan(0) ? '-' : ''
  const color =
    customColor ||
    (variant === 'change'
      ? value.isGreaterThan(0)
        ? 'green'
        : value.isLessThan(0)
          ? 'red'
          : 'subtle'
      : 'contrast')

  const el = (
    <Text
      size={size}
      scaleSize={scaleSize}
      weight="medium"
      font="mono"
      ellipsis
      color={color}
    >
      {variant === 'change'
        ? `${sign}${humanSiacoin(value.absoluteValue(), {
            fixed,
            dynamicUnits,
          })}`
        : humanSiacoin(value, { fixed, dynamicUnits, hastingUnits })}
      <Text size="20" weight="medium" font="mono" ellipsis color="subtle">
        {extendedSuffix ? `${extendedSuffix}` : ''}
      </Text>
    </Text>
  )

  if (showTooltip) {
    return (
      <Tooltip
        content={
          (tooltip ? `${tooltip} ` : '') +
          humanSiacoin(value, {
            fixed: 16,
            dynamicUnits: false,
          })
        }
        side={tipSide}
      >
        {el}
      </Tooltip>
    )
  }

  return el
}
