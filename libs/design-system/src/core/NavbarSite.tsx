import { Box } from './Box'
import { Flex } from './Flex'
import { Container } from './Container'
import { Heading } from './Heading'
import { NextLink } from './Link'
import { Separator } from './Separator'
import { Logo } from './Logo'

type Props = {
  appName?: string
  homeHref: string
  children: React.ReactNode
}

export function NavbarSite({ appName, homeHref, children }: Props) {
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
        size={'4'}
        css={{
          position: 'relative',
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
              <Flex align="center" gap={'2'}>
                <Logo size={40} />
                {appName && (
                  <>
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
                        paddingLeft: 0,
                        '@bp3': {
                          display: 'block',
                        },
                      }}
                    >
                      {appName}
                    </Heading>
                  </>
                )}
              </Flex>
            </NextLink>
          </Box>
          {children}
        </Flex>
      </Container>
    </Box>
  )
}
