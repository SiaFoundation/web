import { Flex } from '../core/Flex'
import { Status } from '../core/Status'
import { Text } from '../core/Text'

type Props = {
  label: string
  enabled?: boolean
  onChange?: (val: boolean) => void
  color?: string
}

export function DataLabel({ label, enabled = true, onChange, color }: Props) {
  return (
    <Flex
      gap="1"
      align="center"
      onClick={() => onChange && onChange(!enabled)}
      css={{
        opacity: enabled ? 1 : 0.5,
        cursor: onChange ? 'pointer' : 'auto',
        '&:hover': onChange && {
          opacity: enabled ? 0.9 : 0.6,
        },
      }}
    >
      {color && <Status size="2" css={{ backgroundColor: color }} />}
      <Text>{label}</Text>
    </Flex>
  )
}
