import { Text } from '../system/Text'
import { Flex } from '../system/Flex'

type Props = {
  title?: string
  children?: React.ReactNode
}

export function Block({ title, children }: Props) {
  return (
    <Flex
      column
      css={{
        position: 'relative',
        padding: '$5 0',
        border: '1px solid $gray',
        borderRadius: '$1',
        textAlign: 'center',
      }}
    >
      {title && (
        <Text
          css={{
            padding: '$3 0',
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </Flex>
  )
}
