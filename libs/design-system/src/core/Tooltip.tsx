import React from 'react'
import { styled } from '../config/theme'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { scaleIn } from '../config/animations'
import { Paragraph } from './Paragraph'

const Content = styled(TooltipPrimitive.Content, {
  boxShadow: '$colors$border, $colors$shadowActive',
  backgroundColor: '$panel',
  borderRadius: '$1',
  padding: '$0-5 $1',

  willChange: 'transform, opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
    animation: `${scaleIn} 0.05s ease-out`,
  },
  position: 'relative',
  maxWidth: '250px',
})

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement
    content: React.ReactNode
  } & React.ComponentProps<typeof Content>

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      delayDuration={300}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <Content
        side="top"
        align="center"
        sideOffset={props.sideOffset || 5}
        {...props}
      >
        <Paragraph size="12">{content}</Paragraph>
      </Content>
    </TooltipPrimitive.Root>
  )
}
