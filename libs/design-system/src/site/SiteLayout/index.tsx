import { Box } from '../../core/Box'
import { ScrollArea } from '../../core/ScrollArea'
import { ImageProps } from '../../lib/image'
import { Flex } from '../../core/Flex'
import { MenuSection, SiteMenu } from './SiteMenu'
import { Container } from '../../core/Container'
import { LinkData } from '../../lib/links'
import React, { useEffect, useState } from 'react'

type Props = {
  appName: string
  homeHref: string
  navbar?: React.ReactNode
  menuSections: MenuSection[]
  externalLinks?: LinkData[]
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
}

export function SiteLayout({
  appName,
  homeHref,
  menuSections,
  externalLinks,
  navbar,
  heading,
  children,
  footer,
  backgroundImage,
  focus: _focus,
  transitions: _transitions = false,
  transitionWidthDuration = 300,
  transitionFadeDelay = 500,
}: Props) {
  // If transitions are on, enable after first client render
  const [transitions, setTransitions] = useState<boolean>(false)
  useEffect(() => {
    if (_transitions) {
      setTransitions(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [transitioning, setTransitioning] = useState<boolean>(false)
  useEffect(() => {
    if (!transitions) {
      return
    }
    setTransitioning(true)
    setTimeout(() => {
      setTransitioning(false)
    }, transitionFadeDelay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_focus])

  const [focus, setFocus] = useState<React.ReactNode>(_focus)

  useEffect(() => {
    if (!_focus) {
      setFocus(_focus)
    } else {
      setTimeout(() => {
        setFocus(_focus)
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_focus])

  return (
    <Box
      as="main"
      css={{
        position: 'relative',
        height: '100%',
        background: '$loContrast',
        overflow: 'hidden',
      }}
    >
      <ScrollArea id="main-scroll">
        <Box
          css={{
            position: 'relative',
            zIndex: 1,
            transition: 'margin 100ms ease-in',
            '@bp2': {
              margin: focus ? '0 $5' : '0 $6',
            },
          }}
        >
          <Container
            size="4"
            css={{
              width: focus ? '800px' : '100%',
              margin: focus ? '0' : '0 auto',
              zIndex: 1,
              maxWidth: focus ? '100%' : '1600px',
              transition: `width ${transitionWidthDuration}ms ease-out`,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '$loContrast',
              borderLeft: `$sizes$frame solid $frame`,
              borderRight: `$sizes$frame solid $frame`,
              padding: 0,
              paddingTop: '$5',
            }}
          >
            <Container size="4">
              <Flex justify="between" align="center">
                {navbar}
                <SiteMenu menuSections={menuSections} />
              </Flex>
            </Container>
            <Flex
              as="main"
              direction="column"
              gap="8"
              css={{
                width: '100%',
                opacity: transitioning ? 0 : 1,
              }}
            >
              {focus || (
                <Flex direction="column">
                  <Box>{heading}</Box>
                  <Box
                    css={{
                      position: 'relative',
                      width: '100%',
                      height: '390px',
                      overflow: 'hidden',
                      borderTop: '$sizes$frame solid $frame',
                      borderBottom: '$sizes$frame solid $frame',
                      '@initial': {
                        display: 'block',
                      },
                      '@bp2': {
                        display: 'none',
                      },
                    }}
                  >
                    <Box
                      css={{
                        position: 'relative',
                        width: '100%',
                        height: '390px',
                        background: `url(${backgroundImage.src})`,
                        backgroundSize: 'cover',
                      }}
                    />
                  </Box>
                  <Box>{children}</Box>
                  {footer}
                </Flex>
              )}
            </Flex>
          </Container>
        </Box>
      </ScrollArea>
      <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          background: 'white',
        }}
      >
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(30, 169, 76, 0.3)',
          }}
        >
          <Box
            css={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: `url(${backgroundImage.src})`,
              backgroundSize: 'cover',
              // opacity: 0.7,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
