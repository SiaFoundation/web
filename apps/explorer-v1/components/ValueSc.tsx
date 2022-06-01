import { Text, Tooltip } from '@siafoundation/design-system'
import { humanNumber, toSiacoins } from '@siafoundation/sia-js'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  value: bigint | number
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
        humanNumber(toSiacoins(value.toString()), {
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
              ? value > 0
                ? '$green11'
                : value < 0
                ? '$red11'
                : '$gray7'
              : '$textContrast',
        }}
      >
        {variant === 'change' && value > 0 ? '+' : ''}
        {humanNumber(toSiacoins(value.toString()), {
          fixed: 2,
          units: 'SC',
        })}
      </Text>
    </Tooltip>
  )
}
