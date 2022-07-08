import {
  Box,
  Container,
  Flex,
  Heading,
  NextLink,
  Separator,
  Logo,
} from '../index'

type Props = {
  appName: string
  homeHref: string
  children: React.ReactNode
  variant: 'site' | 'app'
}

export function AppBar({
  appName,
  homeHref,
  children,
  variant = 'site',
}: Props) {
  return (
    <Box
      css={{
        py: '$2',
        zIndex: 1,
        backgroundColor: '$loContrast',
        borderBottom: '1px solid $slate6',
      }}
    >
      <Container
        size={variant === 'site' ? '4' : 'flush'}
        css={{
          position: 'relative',
          padding: variant === 'site' ? undefined : '0 $3-5',
        }}
      >
        <Flex align="center" justify="between" gap="3">
          <Box
            css={{
              position: 'relative',
              zIndex: 1,
              display: 'none',
              '@bp1': {
                display: 'flex',
              },
            }}
          >
            <NextLink href={homeHref} css={{ textDecoration: 'none' }}>
              <Flex align="center" gap={variant === 'site' ? '2' : '3'}>
                <Logo size={40} />
                <Box
                  css={{
                    height: '30px',
                    display: 'none',
                    '@bp3': {
                      display: 'block',
                    },
                  }}
                >
                  <Separator orientation="vertical" size="100" pad="0" />
                </Box>
                <Heading
                  font="mono"
                  size="20"
                  css={{
                    display: 'none',
                    '@bp3': {
                      display: 'block',
                    },
                  }}
                >
                  {appName}
                </Heading>
              </Flex>
            </NextLink>
          </Box>
          {children}
        </Flex>
      </Container>
    </Box>
  )
}
