import { Text } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
}

export function SmallSection({ children }: Props) {
  return (
    <Text
      css={{
        color: '$gray11',
      }}
    >
      {children}
    </Text>
  )
}
