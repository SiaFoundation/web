import { Text, Tooltip } from '../'
import { humanNumber } from '@siafoundation/sia-js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  value: bigint | number
  variant?: 'change' | 'value'
  tooltip?: string
}

export function ValueSf({
  value,
  size = '14',
  tooltip = '',
  variant = 'change',
}: Props) {
  const formattedValue = humanNumber(String(value), {
    units: 'SF',
  })

  return (
    <Tooltip content={(tooltip ? `${tooltip} ` : '') + formattedValue}>
      <Text
        size={size}
        weight="semibold"
        font="mono"
        css={{
          color:
            variant === 'change'
              ? value > 0
                ? '$green11'
                : value < 0
                ? '$red11'
                : '$gray7'
              : '$textContrast',
        }}
      >
        {variant === 'change' && value > 0 ? '+' : ''}
        {formattedValue}
      </Text>
    </Tooltip>
  )
}
