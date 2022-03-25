import React from 'react'
import { styled, CSS, keyframes } from '../config/theme'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { panelStyles } from './Panel'
import { scaleIn } from '../config/animations'

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode
}

export function Popover({ children, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
}

const StyledContent = styled(PopoverPrimitive.Content, panelStyles, {
  minWidth: 200,
  minHeight: '$6',
  maxWidth: 265,
  '&:focus': {
    outline: 'none',
  },

  willChange: 'transform, opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    transformOrigin: 'var(--radix-popover-content-transform-origin)',
    animation: `${scaleIn} 0.05s ease-out`,
  },
  position: 'relative',
  '&[data-side="top"]': { bottom: '$1' },
  '&[data-side="bottom"]': { top: '$1' },
  '&[data-side="left"]': { right: '$1' },
  '&[data-side="right"]': { left: '$1' },
})

type PopoverContentPrimitiveProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>

type PopoverContentProps = PopoverContentPrimitiveProps & {
  css?: CSS
  hideArrow?: boolean
}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  PopoverContentProps
>(({ children, hideArrow, ...props }, fowardedRef) => (
  <StyledContent sideOffset={0} {...props} ref={fowardedRef}>
    {children}
    {/* {!hideArrow && (
      <Box css={{ color: '$panel' }}>
        <PopoverPrimitive.Arrow
          width={11}
          height={5}
          offset={5}
          style={{ fill: 'currentColor' }}
        />
      </Box>
    )} */}
  </StyledContent>
))

export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverClose = PopoverPrimitive.Close
