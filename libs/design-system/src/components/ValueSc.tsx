import { Text, Tooltip } from '../'
import { humanNumber, humanSiacoin, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  value: BigNumber
  variant?: 'change' | 'value'
  tooltip?: string
}

export function ValueSc({
  value,
  size = '14',
  tooltip = '',
  variant = 'change',
}: Props) {
  return (
    <Tooltip
      content={
        (tooltip ? `${tooltip} ` : '') +
        humanNumber(toSiacoins(value), {
          fixed: 16,
          units: 'SC',
        })
      }
    >
      <Text
        size={size}
        weight="semibold"
        font="mono"
        css={{
          color:
            variant === 'change'
              ? value.isGreaterThan(0)
                ? '$green11'
                : value.isLessThan(0)
                ? '$red11'
                : '$gray7'
              : '$textContrast',
        }}
      >
        {variant === 'change' &&
          (value.isGreaterThan(0) ? '+' : value.isLessThan(0) ? '-' : '')}
        {humanSiacoin(value.absoluteValue())}
      </Text>
    </Tooltip>
  )
}
