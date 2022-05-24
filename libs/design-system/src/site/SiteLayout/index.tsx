import { Box } from '../../core/Box'
import { ScrollArea } from '../../core/ScrollArea'
import { ImageProps } from '../../lib/image'
import { Flex } from '../../core/Flex'
import { SiteMenu } from './SiteMenu'
import { AppBar } from '../../core/AppBar'
import { Container } from '../../core/Container'
import { LinkData } from '../../lib/links'
import React, { useEffect, useState } from 'react'

type Props = {
  navbar?: React.ReactNode
  menuLinks: LinkData[]
  externalLinks?: LinkData[]
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: React.ReactNode
  transitions?: boolean
  transitionDuration?: number
}

export function SiteLayout({
  menuLinks,
  externalLinks,
  navbar,
  heading,
  children,
  footer,
  backgroundImage,
  focus: _focus,
  transitions: _transitions = false,
  transitionDuration = 300,
}: Props) {
  const menuWidth = _focus ? '65%' : '30%'

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
    }, transitionDuration)
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
        border: `$sizes$frame solid $frame`,
        background: '$loContrast',
        overflow: 'hidden',
      }}
    >
      <ScrollArea id="main-scroll">
        <Box
          // After a focus Safari does not apply the padding until the content scrolls,
          // this key fixes that
          key={String(focus)}
          css={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            transition: `padding-right ${transitionDuration}ms ease-out`,
            paddingRight: '0%',
            '@bp3': {
              paddingRight: menuWidth,
            },
          }}
        >
          {navbar && (
            <AppBar size="3" color="none">
              <Container size="4">{navbar}</Container>
            </AppBar>
          )}
          <Flex
            as="main"
            direction="column"
            gap="8"
            css={{ width: '100%', opacity: transitioning ? 0 : 1 }}
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
                    '@bp3': {
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
        </Box>
      </ScrollArea>
      <SiteMenu
        externalLinks={externalLinks}
        menuLinks={menuLinks}
        menuWidth={menuWidth}
      />
      <Box
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 0,
          height: '100%',
          transition: `width ${transitionDuration}ms ease-out`,
          width: '0%',
          display: 'none',
          '@bp3': {
            borderLeft: `$sizes$frame solid $frame`,
            width: menuWidth,
            display: 'block',
          },
          '@bp4': {
            borderLeft: `$sizes$frame solid $frame`,
            width: menuWidth,
            display: 'block',
          },
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
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
