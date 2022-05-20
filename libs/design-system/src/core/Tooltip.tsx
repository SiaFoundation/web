import React from 'react'
import { styled } from '../config/theme'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Text } from './Text'
import { scaleIn } from '../config/animations'

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement
    content: React.ReactNode
    multiline?: boolean
  }

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

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
})

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  multiline,
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
        sideOffset={5}
        {...props}
        multiline={multiline}
      >
        <Text size="12" as="p">
          {content}
        </Text>
      </Content>
    </TooltipPrimitive.Root>
  )
}
