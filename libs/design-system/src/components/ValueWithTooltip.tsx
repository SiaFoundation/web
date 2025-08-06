'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'

type Props = {
  labeledBy?: string
  testId?: string
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  font?: React.ComponentProps<typeof Text>['font']
  showTooltip?: boolean
  weight?: React.ComponentProps<typeof Text>['weight']
  value: string
  tooltip?: string
  color?: React.ComponentProps<typeof Text>['color']
}

/**
 * This component renders provided values. It is used in components
 * likeValueSc and ValueFiat, that internally compute display values.
 */
export function ValueWithTooltip({
  labeledBy,
  testId,
  size = '14',
  scaleSize,
  tipSide,
  font = 'mono',
  showTooltip = true,
  weight = 'medium',
  value,
  tooltip,
  color,
}: Props) {
  const el = (
    <Text
      aria-labelledby={labeledBy}
      data-testid={testId}
      size={size}
      scaleSize={scaleSize}
      weight={weight}
      font={font}
      ellipsis
      color={color}
    >
      {value}
    </Text>
  )

  if (showTooltip) {
    return (
      <Tooltip content={tooltip} side={tipSide}>
        {el}
      </Tooltip>
    )
  }

  return el
}
