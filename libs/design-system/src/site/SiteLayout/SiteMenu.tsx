import React from 'react'
import { styled, keyframes, VariantProps, CSS } from '../../config/theme'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { overlayStyles } from '../../core/Overlay'
import { IconButton } from '../../core/IconButton'
import { LogoMenuIcon } from '../../icons/LogoMenuIcon'
import { Box } from '../../core/Box'
import { Close24 } from '../../icons'
import { Flex } from '../../core/Flex'
import { ThemeRadio } from '../../components/ThemeRadio'
import { Text } from '../../core/Text'

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
  backgroundColor: '$panelDark',
  border: '$sizes$frame solid $frame',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '100%',

  '@bp3': {
    width: 'calc(30% + $sizes$frame)',
  },

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

type ContentVariants = VariantProps<typeof StyledContent>
type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type ContentProps = DialogContentPrimitiveProps &
  ContentVariants & { css?: CSS }

export const Content = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  ContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
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

const radioCss: CSS = {
  color: '$whiteA7',

  [`& *, & ${Text}`]: {
    color: '$whiteA10',
  },

  [`&[data-state="checked"]`]: {
    color: 'white',
  },

  [`&[data-state="checked"] *, &[data-state="checked"] ${Text}`]: {
    color: 'white',
  },
}

type Props = {
  children: React.ReactNode
}

export function SiteMenu({ children }: Props) {
  return (
    <Box css={{ position: 'relative', zIndex: 1 }}>
      <Container>
        <Trigger asChild>
          <Box css={{ position: 'fixed', top: '$3', right: '$3' }}>
            <Box css={{ height: '$8', width: '$8', display: 'inline-flex' }}>
              <LogoMenuIcon />
            </Box>
          </Box>
        </Trigger>
        <Content>
          <Flex
            direction="column"
            align="center"
            justify="center"
            css={{
              height: '100%',
              padding: '$6',
              '& *': {
                color: 'white',
              },
            }}
          >
            {children}
          </Flex>
          <Box css={{ position: 'absolute', bottom: '$3', right: '$3' }}>
            <ThemeRadio radioCss={radioCss} />
          </Box>
        </Content>
      </Container>
    </Box>
  )
}
