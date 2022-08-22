import { Box, Flex } from '../index'
import { Text } from './Text'

type Props = {
  appName?: string
  homeHref: string
  children: React.ReactNode
}

export const navbarAppHeight = 60

export function NavbarApp({ appName, homeHref, children }: Props) {
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
      {appName && (
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
          {appName}
        </Text>
      )}
      <Box css={{ flex: 1 }}>{children}</Box>
    </Flex>
  )
}
