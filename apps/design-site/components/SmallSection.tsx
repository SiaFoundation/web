import { Text } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
}

export function SmallSection({ children }: Props) {
  return (
    <Text
      css={{
        color: '$brandGray11',
      }}
    >
      {children}
    </Text>
  )
}
