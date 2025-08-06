'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import { getCurrencyDisplayPropsSc } from '../lib/currencyDisplay'
import { ValueWithTooltip } from './ValueWithTooltip'
import { useMemo } from 'react'

type Props = {
  labeledBy?: string
  testId?: string
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  fixed?: number
  font?: React.ComponentProps<typeof Text>['font']
  color?: React.ComponentProps<typeof Text>['color']
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
}

export function ValueSc({
  labeledBy,
  testId,
  value,
  size,
  scaleSize,
  tooltip = '',
  tipSide,
  font = 'mono',
  variant = 'change',
  color,
  fixed = 3,
  dynamicUnits = true,
  hastingUnits = true,
  extendedSuffix,
  showTooltip = true,
}: Props) {
  const displayProps = useMemo(
    () =>
      getCurrencyDisplayPropsSc({
        sc: value,
        variant,
        fixed,
        color,
        dynamicUnits,
        hastingUnits,
        tooltip,
        extendedSuffix,
      }),
    [
      value,
      variant,
      fixed,
      color,
      dynamicUnits,
      hastingUnits,
      tooltip,
      extendedSuffix,
    ],
  )

  if (!displayProps) {
    return null
  }

  return (
    <ValueWithTooltip
      labeledBy={labeledBy}
      testId={testId}
      size={size}
      scaleSize={scaleSize}
      tipSide={tipSide}
      font={font}
      showTooltip={showTooltip}
      value={displayProps.value}
      tooltip={displayProps.tooltip}
      color={displayProps.color}
    />
  )
}
