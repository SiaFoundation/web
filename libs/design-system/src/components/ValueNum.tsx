import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  weight?: React.ComponentProps<typeof Text>['weight']
  value: BigNumber
  variant?: 'change' | 'value'
  tooltip?: string
  color?: string
  format: (value: BigNumber) => string
}

export function ValueNum({
  value,
  size = '14',
  weight = 'semibold',
  tooltip = '',
  variant = 'change',
  color: customColor,
  format,
}: Props) {
  const sign = value.isGreaterThan(0) ? '+' : value.isLessThan(0) ? '-' : ''
  const color =
    variant === 'change'
      ? value.isGreaterThan(0)
        ? '$green11'
        : value.isLessThan(0)
        ? '$red11'
        : '$gray7'
      : '$textContrast'

  return (
    <Tooltip content={(tooltip ? `${tooltip} ` : '') + format(value)}>
      <Text
        size={size}
        weight={weight}
        font="mono"
        ellipsis
        css={{
          color: customColor || color,
        }}
      >
        {variant === 'change'
          ? `${sign}${format(value.absoluteValue())}`
          : format(value)}
      </Text>
    </Tooltip>
  )
}
