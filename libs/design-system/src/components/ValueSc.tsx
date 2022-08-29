import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { humanSiacoin } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  value: BigNumber
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  dynamicUnits?: boolean
  showTooltip?: boolean
}

export function ValueSc({
  value,
  size = '14',
  tooltip = '',
  variant = 'change',
  fixed = 3,
  dynamicUnits = true,
  showTooltip = true,
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

  const el = (
    <Text
      size={size}
      weight="semibold"
      font="mono"
      ellipsis
      css={{
        color,
      }}
    >
      {variant === 'change'
        ? `${sign}${humanSiacoin(value.absoluteValue(), {
            fixed,
            dynamicUnits,
          })}`
        : humanSiacoin(value, { fixed, dynamicUnits })}
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
      >
        {el}
      </Tooltip>
    )
  }

  return el
}
