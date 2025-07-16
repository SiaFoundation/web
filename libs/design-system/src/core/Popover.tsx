'use client'

import { AnimatePresence, motion, Variants } from 'motion/react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { panelStyles } from './Panel'
import { cva, cx } from 'class-variance-authority'
import { useOpen } from '../hooks/useOpen'
import { ScrollArea } from './ScrollArea'

const contentContainerStyles = cva([
  'relative',
  'z-10',
  'outline-none',
  'max-w-sm',
  'data-[side=top]:bottom-1',
  'data-[side=top]:origin-bottom',
  'data-[side=bottom]:top-1',
  'data-[side=bottom]:origin-top',
  'data-[side=left]:right-1',
  'data-[side=left]:origin-right',
  'data-[side=right]:left-1',
  'data-[side=right]:origin-left',
])

const contentStyles = cx(panelStyles(), cva(['py-1', 'px-1'])())

export const PopoverClose = PopoverPrimitive.Close

type Props = {
  rootProps?: React.ComponentProps<typeof PopoverPrimitive.Root>
  contentProps?: React.ComponentProps<typeof PopoverPrimitive.Content>
  trigger: React.ReactNode
  children: React.ReactNode
}

const variants: Variants = {
  show: {
    opacity: [0, 1],
    scale: [0.95, 1],
    transition: { duration: 0.1, ease: 'easeOut' },
  },
  exit: {
    opacity: [1, 0],
    scale: [1, 0.95],
    transition: { duration: 0.1, ease: 'easeIn' },
  },
}

export function Popover({
  trigger,
  children,
  rootProps,
  contentProps,
  ref,
}: Props & { ref?: React.Ref<HTMLDivElement> }) {
  const { open, onOpenChange } = useOpen({
    open: rootProps?.open,
    onOpenChange: rootProps?.onOpenChange,
  })
  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <AnimatePresence>
        {open ? (
          <PopoverPrimitive.Portal forceMount>
            <PopoverPrimitive.Content
              asChild
              forceMount
              ref={ref}
              {...contentProps}
            >
              <motion.div
                variants={variants}
                initial="init"
                animate="show"
                exit="exit"
                className={contentContainerStyles()}
              >
                <ScrollArea className={contentStyles}>{children}</ScrollArea>
              </motion.div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </PopoverPrimitive.Root>
  )
}
