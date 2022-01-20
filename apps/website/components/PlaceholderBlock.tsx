import { Panel, Text } from '@siafoundation/design-system'

type Props = {
  title?: string
  children?: React.ReactNode
}

export function PlaceholderBlock({ title, children }: Props) {
  return (
    <Panel
      css={{
        padding: '$5 0',
        textAlign: 'center',
      }}
    >
      {title && (
        <Text
          css={{
            display: 'block',
            padding: '$3 0',
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </Panel>
  )
}
