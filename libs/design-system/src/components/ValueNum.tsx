import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'

type Props = {
  labeledBy?: string
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
  variant = 'change',
  color: customColor,
  format,
  labeledBy,
}: Props) {
  const sign = value.isGreaterThan(0) ? '+' : value.isLessThan(0) ? '-' : ''
  const color =
    variant === 'change'
      ? value.isGreaterThan(0)
        ? 'green'
        : value.isLessThan(0)
        ? 'red'
        : 'subtle'
      : 'contrast'

  return (
    <Tooltip
      side={tipSide}
      content={(tooltip ? `${tooltip} ` : '') + format(value)}
    >
      <Text
        aria-labelledby={labeledBy}
        size={size}
        weight={weight}
        font="mono"
        ellipsis
        color={customColor || color}
      >
        {variant === 'change'
          ? `${sign}${format(value.absoluteValue())}`
          : format(value)}
      </Text>
    </Tooltip>
  )
}
