import { Flex } from '../core/Flex'
import { Box } from '../core/Box'
import { Text } from '../core/Text'

type Props = {
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export const navbarAppHeight = 60

export function AppNavbar({ title, filters, actions }: Props) {
  return (
    <Flex
      align="center"
      gap="2"
      css={{
        px: '$3-5',
        height: `${navbarAppHeight}px`,
        zIndex: 1,
        backgroundColor: '$loContrast',
        borderBottom: '1px solid $slate6',
      }}
    >
      {title && (
        <Text
          font="mono"
          size="18"
          weight="bold"
          css={{
            display: 'none',
            '@bp3': {
              display: 'block',
            },
          }}
        >
          {title}
        </Text>
      )}
      <Box css={{ flex: 1 }}>
        <Flex gap="2" align="center" justify="between">
          <Flex gap="1" align="center">
            {filters}
          </Flex>
          <Flex gap="2" align="center">
            <Flex gap="1" align="center">
              {actions}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
