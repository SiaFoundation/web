import React from 'react'
import { styled } from '../config/theme'
import { mauve, blackA } from '@radix-ui/colors'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

const SCROLLBAR_SIZE = 10

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: '100%',
  height: '100%',
  borderRadius: 4,
  overflow: 'hidden',
})

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  zIndex: 1,
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  // background: blackA.blackA3,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA6 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
})

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
})

// Exports
const ScrollAreaContainer = StyledScrollArea
const ScrollAreaViewport = StyledViewport
const ScrollAreaScrollbar = StyledScrollbar
const ScrollAreaThumb = StyledThumb
const ScrollAreaCorner = StyledCorner

type Props = {
  id?: string
  children: React.ReactNode
}

export const ScrollArea = ({ id, children }: Props) => (
  <ScrollAreaContainer>
    <ScrollAreaViewport id={id}>{children}</ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaContainer>
)
