import React from 'react'
import { styled, CSS, keyframes, css } from '../config/theme'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Close16 } from '../icons'
import { overlayStyles } from './Overlay'
import { panelStyles } from './Panel'
import { IconButton } from './IconButton'

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.56)' },
  '70%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.01)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode
}

export const dialogOverlayStyles = css(overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 3,
  inset: 0,
  willChange: 'opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
})

export const DialogOverlay = styled(
  DialogPrimitive.Overlay,
  dialogOverlayStyles
)

export function Dialog({ children, ...props }: DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
}

export const dialogContentStyles = css({
  backgroundColor: '$panel',
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  color: '$hiContrast',
  borderRadius: '$2',
  // boxShadow:
  //   'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  boxShadow: '$colors$shadowActive',
  zIndex: 3,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '$2',
  willChange: 'transform, opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },
})

const StyledContent = styled(DialogPrimitive.Content, dialogContentStyles)

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
})

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DialogContentProps = DialogContentPrimitiveProps & { css?: CSS }

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <StyledCloseButton asChild>
      <IconButton variant="ghost">
        <Close16 />
      </IconButton>
    </StyledCloseButton>
  </StyledContent>
))

export const DialogPortal = DialogPrimitive.Portal
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export const dialogTitleCss = css({
  color: '$hiContrast',
  fontFamily: '$sans',
  fontWeight: 500,
  lineHeight: '20px',
})
export const DialogTitle = styled(DialogPrimitive.Title, dialogTitleCss)
export const dialogDescriptionCss = css({
  color: '$hiContrast',
  fontFamily: '$sans',
  fontWeight: 400,
  lineHeight: '1',
})
export const DialogDescription = styled(
  DialogPrimitive.Description,
  dialogDescriptionCss
)
