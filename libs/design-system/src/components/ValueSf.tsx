'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { humanNumber } from '@siafoundation/units'
import { getSignAndColor } from '../lib/currencyDisplay'
import { ValueWithTooltip } from './ValueWithTooltip'

type Props = {
  labeledBy?: string
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: number
  variant?: 'change' | 'value'
  tooltip?: string
  testId?: string
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  font?: React.ComponentProps<typeof Text>['font']
  showTooltip?: boolean
}

export function ValueSf({
  labeledBy,
  value,
  size,
  scaleSize,
  tooltip = '',
  variant = 'change',
  testId,
  tipSide,
  font,
  showTooltip = true,
}: Props) {
  const { sign, color } = getSignAndColor(value, variant)
  const formattedValue = humanNumber(String(value), {
    units: 'SF',
  })

  const displayValue =
    variant === 'change' ? `${sign}${formattedValue}` : formattedValue

  const displayTooltip = (tooltip ? `${tooltip} ` : '') + formattedValue

  return (
    <ValueWithTooltip
      labeledBy={labeledBy}
      testId={testId}
      size={size}
      scaleSize={scaleSize}
      tipSide={tipSide}
      font={font}
      showTooltip={showTooltip}
      value={displayValue}
      tooltip={displayTooltip}
      color={color}
    />
  )
}
