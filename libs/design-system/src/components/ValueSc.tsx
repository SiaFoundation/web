import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { humanSiacoin } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  value: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  dynamicUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
}

export function ValueSc({
  value,
  size,
  scaleSize,
  tooltip = '',
  variant = 'change',
  fixed = 3,
  dynamicUnits = true,
  extendedSuffix,
  showTooltip = true,
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
        : humanSiacoin(value, { fixed, dynamicUnits })}
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
      >
        {el}
      </Tooltip>
    )
  }

  return el
}
