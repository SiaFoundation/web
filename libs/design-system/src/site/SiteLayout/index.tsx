import { Box } from '../../core/Box'
import { ScrollArea } from '../../core/ScrollArea'
import { NextImage } from '../../core/Image'
import { ImageProps } from '../../lib/image'
import { Flex } from '../../core/Flex'
import { SiteMenu } from './SiteMenu'
import { AppBar } from '../../core/AppBar'
import { Container } from '../../core/Container'
import { LinkData } from '../../lib/links'

type Props = {
  navbar?: React.ReactNode
  menuLinks: LinkData[]
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: boolean
}

export function SiteLayout({
  navbar,
  menuLinks,
  heading,
  children,
  footer,
  backgroundImage,
  focus,
}: Props) {
  const menuWidth = focus ? '55%' : '30%'
  return (
    <Box
      as="main"
      css={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        border: `$sizes$frame solid $frame`,
        background: '$loContrast',
      }}
    >
      <ScrollArea id="main-scroll">
        <Box
          css={{
            position: 'relative',
            flex: 2,
            '@inital': {
              marginRight: '0%',
            },
            '@bp3': {
              marginRight: menuWidth,
            },
          }}
        >
          {navbar && (
            <AppBar
              size="3"
              css={{
                zIndex: 2,
              }}
            >
              <Container size="4">{navbar}</Container>
            </AppBar>
          )}
          <Box
            css={{
              position: 'relative',
              flex: 2,
            }}
          >
            <Flex as="main" direction="column" gap="8" css={{ width: '100%' }}>
              <Flex direction="column">
                {!focus && heading}
                {!focus && (
                  <Box
                    css={{
                      position: 'relative',
                      width: '100%',
                      height: '390px',
                      borderTop: '$sizes$frame solid $frame',
                      borderBottom: '$sizes$frame solid $frame',
                      '@initial': {
                        display: 'block',
                      },
                      '@bp3': {
                        display: 'none',
                      },
                    }}
                  >
                    <NextImage
                      src={backgroundImage.src}
                      blurDataURL={backgroundImage.blurDataURL}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                )}
                {children}
                {!focus && footer}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </ScrollArea>
      <SiteMenu links={menuLinks} menuWidth={menuWidth} />
      <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
          height: '100%',
          transition: 'width 50ms linear',
          '@inital': {
            width: '0%',
            display: 'none',
          },
          '@bp3': {
            borderLeft: `$sizes$frame solid $frame`,
            width: menuWidth,
          },
          '@bp4': {
            borderLeft: `$sizes$frame solid $frame`,
            width: menuWidth,
          },
          overflow: 'hidden',
        }}
      >
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <NextImage
            src={backgroundImage.src}
            blurDataURL={backgroundImage.blurDataURL}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  )
}
