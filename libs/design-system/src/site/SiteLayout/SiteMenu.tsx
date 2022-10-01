import React, { useCallback, useState } from 'react'
import { styled, keyframes, CSS } from '../../config/theme'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { overlayStyles } from '../../core/Overlay'
import { IconButton } from '../../core/IconButton'
import { LogoMenuIcon } from '../../icons/LogoMenuIcon'
import { Box } from '../../core/Box'
import { Flex } from '../../core/Flex'
import { Close24 } from '../../icons'
import { LinkData } from '../../lib/links'
import { SiteMap } from '../SiteMap'
import { ScrollArea } from '../../core'

const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
})

const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
})

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  '&[data-state="open"]': {
    animation: `${fadeIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
})

type ContainerProps = React.ComponentProps<typeof DialogPrimitive.Root>

function Container({ children, ...props }: ContainerProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  )
}

const slideIn = keyframes({
  from: {
    opacity: 0.7,
    transform: '$$transformValue',
  },
  to: {
    opacity: 1,
    transform: 'translate(0,0) scale(1)',
  },
})

const slideOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translate(0,0) scale(1)',
  },
  to: {
    opacity: 0,
    transform: '$$transformValue',
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'black',
  borderLeft: '$sizes$frame solid $frame',
  borderRight: '$sizes$frame solid $frame',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  transition: 'width 50ms linear',
  $$transformValue: 'translate(10%, -10%) scale(0.7)',
  willChange: 'transform',

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },

    '&[data-state="closed"]': {
      animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
    },
  },
})

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
})

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type ContentProps = DialogContentPrimitiveProps & {
  css?: CSS
}

const Content = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  ContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent
    {...props}
    ref={forwardedRef}
    css={{
      position: 'fixed',
      margin: '0 auto',
      maxWidth: '1600px',
      '@bp2': {
        margin: '0 $6',
      },
      '@bp4': {
        margin: '0 auto',
      },
      height: '100%',
    }}
  >
    {children}
    <StyledCloseButton asChild>
      <Box css={{ position: 'absolute', top: '$3', right: '$3' }}>
        <IconButton size="3" variant="ghost" css={{ color: 'white' }}>
          <Close24 />
        </IconButton>
      </Box>
    </StyledCloseButton>
  </StyledContent>
))

export const Trigger = DialogPrimitive.Trigger
export const Close = DialogPrimitive.Close
export const Title = DialogPrimitive.Title
export const Description = DialogPrimitive.Description

export type MenuSection = {
  title: string
  links: LinkData[]
}

type Props = {
  menuSections: MenuSection[]
}

export function SiteMenu({ menuSections }: Props) {
  const [open, _setOpen] = useState<boolean>(false)

  const setOpen = useCallback(
    (open: boolean) => {
      _setOpen(open)
      if (open) {
        setTimeout(() => {
          document.getElementById('menu-scroll')?.scrollTo({
            top: 0,
          })
        }, 100)
      }
      if (!open) {
        document.body.setAttribute('style', '')
      }
    },
    [_setOpen]
  )

  return (
    <Box css={{ position: 'relative', zIndex: 2 }}>
      <Container open={open} onOpenChange={setOpen}>
        <Trigger asChild>
          <Box
            css={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Box css={{ height: '$8', width: '$8', display: 'inline-flex' }}>
              <LogoMenuIcon />
            </Box>
          </Box>
        </Trigger>
        <Content>
          <ScrollArea id="menu-scroll">
            <Flex
              direction="column"
              align="center"
              justify="center"
              css={{
                height: '100%',
                padding: '$12 $6',
                margin: '0 auto',
                maxWidth: '1200px',
                '& *': {
                  color: 'white',
                },
              }}
            >
              <SiteMap
                menuSections={menuSections}
                onClick={() => setOpen(false)}
                inSiteMenu
              />
            </Flex>
          </ScrollArea>
        </Content>
      </Container>
    </Box>
  )
}
