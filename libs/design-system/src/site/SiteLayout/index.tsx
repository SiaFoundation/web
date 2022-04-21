import { Box } from '../../core/Box'
import { ScrollArea } from '../../core/ScrollArea'
import { NextImage } from '../../core/Image'
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
  heading: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  backgroundImage: ImageProps
  focus?: boolean
  transitionDuration?: number
}

export function SiteLayout({
  menuLinks,
  navbar: _navbar,
  heading: _heading,
  children: _children,
  footer: _footer,
  backgroundImage,
  focus,
  transitionDuration = 300,
}: Props) {
  const menuWidth = focus ? '65%' : '30%'

  const [transitioning, setTransitioning] = useState<boolean>(true)
  useEffect(() => {
    setTransitioning(true)

    setTimeout(() => {
      setTransitioning(false)
    }, transitionDuration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  const _image = (
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
  )

  const [navbar, setNavbar] = useState<React.ReactNode>(_navbar)
  const [heading, setHeading] = useState<React.ReactNode>(_heading)
  const [children, setChildren] = useState<React.ReactNode>(_children)
  const [footer, setFooter] = useState<React.ReactNode>(_footer)
  const [image, setImage] = useState<React.ReactNode>(_image)

  useEffect(() => {
    setNavbar(_navbar)
  }, [_navbar])
  useEffect(() => {
    setHeading(_heading)
  }, [_heading])
  useEffect(() => {
    setFooter(_footer)
  }, [_footer])

  useEffect(() => {
    setNavbar(null)
    setHeading(null)
    setChildren(null)
    setFooter(null)
    setImage(null)

    setTimeout(() => {
      setNavbar(_navbar)
      setHeading(_heading)
      setChildren(_children)
      setFooter(_footer)
      setImage(_image)
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_children])

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
            transition: `padding-right ${transitionDuration}ms ease-out`,
            '@initial': {
              paddingRight: '0%',
            },
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
          <Flex as="main" direction="column" gap="8" css={{ width: '100%' }}>
            <Flex direction="column">
              <Box css={{ opacity: transitioning ? 0 : 1 }}>
                {!focus && heading}
              </Box>
              {!focus && image}
              <Box css={{ opacity: transitioning ? 0 : 1 }}>{children}</Box>
              {!focus && footer}
            </Flex>
          </Flex>
        </Box>
      </ScrollArea>
      <SiteMenu
        links={menuLinks}
        menuWidth={menuWidth}
        transitionDuration={transitionDuration}
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
