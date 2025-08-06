import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import { ValueWithTooltip } from './ValueWithTooltip'
import { getSignAndColor } from '../lib/currencyDisplay'

type Props = {
  labeledBy?: string
  testId?: string
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  font?: React.ComponentProps<typeof Text>['font']
  showTooltip?: boolean
  size?: React.ComponentProps<typeof Text>['size']
  weight?: React.ComponentProps<typeof Text>['weight']
  value: BigNumber
  variant?: 'change' | 'value'
  tooltip?: string
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
  color?: React.ComponentProps<typeof Text>['color']
  format: (value: BigNumber) => string
}

export function ValueNum({
  value,
  size = '14',
  weight = 'semibold',
  tooltip = '',
  tipSide,
  showTooltip = true,
  variant = 'change',
  color: customColor,
  format,
  labeledBy,
  testId,
  scaleSize,
  font,
}: Props) {
  const { sign, color } = getSignAndColor(value, variant, customColor)

  const displayValue =
    variant === 'change'
      ? `${sign}${format(value.absoluteValue())}`
      : format(value)

  const displayTooltip = (tooltip ? `${tooltip} ` : '') + format(value)

  return (
    <ValueWithTooltip
      labeledBy={labeledBy}
      testId={testId}
      size={size}
      scaleSize={scaleSize}
      tipSide={tipSide}
      weight={weight}
      font={font}
      showTooltip={showTooltip}
      value={displayValue}
      tooltip={displayTooltip}
      color={color}
    />
  )
}
