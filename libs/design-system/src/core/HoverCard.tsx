'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { panelStyles } from './Panel'
import { cva, cx } from 'class-variance-authority'
import { useOpen } from '../hooks/useOpen'
import { rootClasses } from '../config/css'

const contentContainerStyles = cva([
  rootClasses,
  'relative',
  'z-10',
  'data-[side=top]:bottom-1',
  'data-[side=top]:origin-bottom',
  'data-[side=bottom]:top-1',
  'data-[side=bottom]:origin-top',
  'data-[side=left]:right-1',
  'data-[side=left]:origin-right',
  'data-[side=right]:left-1',
  'data-[side=right]:origin-left',
])

const contentStyles = cx(panelStyles(), 'max-w-sm', 'py-0.5', 'px-1')

type Props = {
  rootProps?: React.ComponentProps<typeof HoverCardPrimitive.Root>
  contentProps?: React.ComponentProps<typeof HoverCardPrimitive.Content>
  trigger?: React.ReactNode
  children: React.ReactNode
}

const variants = {
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

export const HoverCard = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  Props
>(({ trigger, children, rootProps, contentProps: _contentProps }, ref) => {
  const { className: contentClassName, ...contentProps } = _contentProps || {}
  const { open, onOpenChange } = useOpen({
    open: rootProps?.open,
    onOpenChange: rootProps?.onOpenChange,
  })
  return (
    <HoverCardPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      {trigger && (
        <HoverCardPrimitive.Trigger asChild>
          {trigger}
        </HoverCardPrimitive.Trigger>
      )}
      {/* <HoverCardPrimitive.Anchor className="inline" /> */}
      <AnimatePresence>
        {open ? (
          <HoverCardPrimitive.Portal forceMount>
            <HoverCardPrimitive.Content
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
                <div className={cx(contentStyles, contentClassName)}>
                  {children}
                </div>
              </motion.div>
            </HoverCardPrimitive.Content>
          </HoverCardPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </HoverCardPrimitive.Root>
  )
})
