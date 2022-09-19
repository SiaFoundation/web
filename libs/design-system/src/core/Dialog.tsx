import React, { useEffect, useRef, useState } from 'react'
import { styled, CSS, keyframes, css } from '../config/theme'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Close24 } from '../icons'
import { overlayStyles } from './Overlay'
import { IconButton } from './IconButton'
import { ScrollArea } from './ScrollArea'
import { Box } from '../core/Box'

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.56)' },
  '70%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1.01)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

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

const DialogOverlay = styled(DialogPrimitive.Overlay, dialogOverlayStyles)

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
})

const DialogPortal = DialogPrimitive.Portal

export const dialogTitleCss = css({
  color: '$hiContrast',
  fontFamily: '$sans',
  fontSize: '$24',
  fontWeight: 500,
  lineHeight: '30px',
  margin: '0 $2',
  padding: '$2 0 $1 0',
  variants: {
    separator: {
      true: {
        borderBottom: '1px solid $gray3',
      },
    },
  },
})
const DialogTitle = styled(DialogPrimitive.Title, dialogTitleCss)

export const dialogDescriptionCss = css({
  color: '$textSubtle',
  fontFamily: '$sans',
  fontSize: '$14',
  fontWeight: 400,
  lineHeight: '150%',
  padding: '$1 0',
})
const DialogDescription = styled(
  DialogPrimitive.Description,
  dialogDescriptionCss
)

type DialogControlsProps = {
  children: React.ReactNode
  separator?: boolean
}

function DialogControls({ children, separator = true }: DialogControlsProps) {
  return (
    <Box
      css={{
        padding: '$1 0',
        margin: '0 $2',
        borderTop: separator ? '1px solid $gray3' : 'none',
      }}
    >
      {children}
    </Box>
  )
}

export const dialogContentStyles = css({
  backgroundColor: '$panel',
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  color: '$hiContrast',
  borderRadius: '$2',
  boxShadow: '$colors$shadowActive',
  zIndex: 3,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '400px',
  overflow: 'hidden',
  willChange: 'transform, opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },
})

const StyledContent = styled(DialogPrimitive.Content, dialogContentStyles)

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DialogContentProps = Omit<DialogContentPrimitiveProps, 'onSubmit'> & {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  title: React.ReactNode
  description?: React.ReactNode
  controls?: React.ReactNode
  children?: React.ReactNode
  css?: CSS
}

const DialogInnerContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(
  (
    { children, onSubmit, title, description, controls, ...props },
    forwardedRef
  ) => {
    const { ref, height } = useHeight([children, description])
    const [showSeparator, setShowSeparator] = useState<boolean>(false)
    useEffect(() => {
      // 0.7 is eual to the maxHeight: 70vh below
      setShowSeparator(height > window.innerHeight * 0.7)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height])
    return (
      <StyledContent {...props} ref={forwardedRef}>
        <Box as={onSubmit ? 'form' : 'div'} onSubmit={onSubmit}>
          {title && (
            <DialogTitle separator={showSeparator}>{title}</DialogTitle>
          )}
          <Box
            css={{
              height: height || 'inherit',
              maxHeight: '70vh',
              overflow: 'hidden',
            }}
          >
            <ScrollArea>
              <Box ref={ref} css={{ padding: '$2' }}>
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
                {children}
              </Box>
            </ScrollArea>
          </Box>
          {controls && (
            <DialogControls separator={showSeparator}>
              {controls}
            </DialogControls>
          )}
          <StyledCloseButton asChild>
            <IconButton size="1" variant="ghost">
              <Close24 />
            </IconButton>
          </StyledCloseButton>
        </Box>
      </StyledContent>
    )
  }
)

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>((props, forwardedRef) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogInnerContent {...props} ref={forwardedRef} />
    </DialogPortal>
  )
})

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

function useHeight(deps: unknown[] = []) {
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    const update = () => setHeight(node.clientHeight)
    update()
    ref.current.addEventListener('resize', update)
    return () => {
      node.removeEventListener('resize', update)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return {
    ref,
    height,
  }
}
