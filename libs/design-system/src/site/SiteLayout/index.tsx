import { Box } from '../../core/Box'
import { ScrollArea } from '../../core/ScrollArea'
import { ImageProps } from '../../lib/image'
import { Flex } from '../../core/Flex'
import { MenuSection, SiteMenu } from './SiteMenu'
import { Container } from '../../core/Container'
import React, { useEffect, useState } from 'react'

type Props = {
  navbar?: React.ReactNode
  menuSections: MenuSection[]
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionWidthDuration?: number
  transitionFadeDelay?: number
}

const focusWidth = '600px'

export function SiteLayout({
  menuSections,
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

  // const [pixelKey, setPixelKey] = useState<string>('pixel')
  // useEffect(() => {
  //   const i = setInterval(() => {
  //     setPixelKey(String(Math.random()))
  //   }, 5_000)
  //   return () => {
  //     clearInterval(i)
  //   }
  // }, [])

  return (
    <Box
      css={{
        position: 'relative',
        height: '100%',
        border: focus ? '$sizes$frame solid $frame' : 'none',
        overflow: 'hidden',
      }}
    >
      {focus && (
        <Box css={{ position: 'fixed', zIndex: 2, top: '$4', right: '$4' }}>
          <SiteMenu menuSections={menuSections} />
        </Box>
      )}
      <Box css={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <ScrollArea id="main-scroll">
          <Box
            css={{
              transition: 'margin 100ms ease-in',
              '@bp2': {
                margin: focus ? '0' : '0 $6',
              },
            }}
          >
            <Container
              size="4"
              css={{
                width: focus ? focusWidth : '100%',
                margin: focus ? '0' : '0 auto',
                maxWidth: focus ? '100%' : '1600px',
                background: transitioning ? '$loContrast' : 'none',
                transition: `width ${transitionWidthDuration}ms ease-out`,
                position: 'relative',
                overflow: 'hidden',
                border: focus ? 'none' : '$sizes$frame solid $frame',
                '@bp1': {
                  borderRight: '$sizes$frame solid $frame',
                },
                padding: 0,
                // paddingTop: '$5',
              }}
            >
              <Container
                size="4"
                css={{ backgroundColor: '$loContrast', paddingTop: '$5' }}
              >
                <Flex justify="between" align="start">
                  {navbar}
                  {!focus && <SiteMenu menuSections={menuSections} />}
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
                {focus}
                {!focus && (
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
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          mixBlendMode: 'darken',
                          zIndex: 1,
                          backgroundColor: '$subtleAccentMask',
                        }}
                      />
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
      </Box>
      <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
          height: '100%',
          width: focus ? `calc(100% - ${focusWidth})` : '100%',
          left: focus ? focusWidth : 0,
          overflow: 'hidden',
          background: 'white',
        }}
      >
        <Box
          css={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            css={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              mixBlendMode: 'darken',
              zIndex: 1,
              backgroundColor: '$subtleAccentMask',
            }}
          />
          {/* <Box key={pixelKey}>
            {times(1000, (i) => (
              <Box
                css={{
                  position: 'absolute',
                  left: `${random(0, 100)}%`,
                  top: `${random(0, 100)}%`,
                  width: `0.15%`,
                  height: `2px`,
                  borderRadius: '1px',
                  backgroundColor: 'black',
                  zIndex: 1,
                }}
              />
            ))}
          </Box> */}
          <Box
            css={{
              zIndex: 0,
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
