'use client'

import React from 'react'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { cva, cx } from 'class-variance-authority'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { separatorStyles, itemStyles, labelStyles } from './Menu'
import { panelStyles } from './Panel'
import { useOpen } from '../hooks/useOpen'
import { ArrowRight16 } from '@siafoundation/react-icons'

const contentContainerStyles = cva([
  'relative',
  'max-w-sm',
  'z-30',
  'py-1',
  'data-[side=top]:bottom-1',
  'data-[side=top]:origin-bottom',
  'data-[side=bottom]:top-1',
  'data-[side=bottom]:origin-tip',
  'data-[side=left]:right-1',
  'data-[side=left]:origin-right',
  'data-[side=right]:left-1',
  'data-[side=right]:origin-left',
])

const contentStyles = (className?: string) =>
  cx(
    panelStyles(),
    cva(['max-w-xs', 'shadow-sm', 'py-1', 'px-1'])({
      className,
    })
  )

const animationVariants: Variants = {
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

type DropdownMenuProps = {
  ref?: React.RefObject<HTMLDivElement>
  label?: string
  rootProps?: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
  contentProps?: React.ComponentProps<typeof DropdownMenuPrimitive.Content>
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DropdownMenu({
  ref,
  label,
  rootProps,
  contentProps,
  trigger,
  children,
  className,
  open: _open,
  onOpenChange: _onOpenChange,
}: DropdownMenuProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })

  return (
    <DropdownMenuPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      <DropdownMenuPrimitive.Trigger asChild aria-label={label}>
        {trigger}
      </DropdownMenuPrimitive.Trigger>
      <AnimatePresence>
        {open ? (
          <DropdownMenuPrimitive.Portal forceMount>
            <DropdownMenuPrimitive.Content
              data-testid="dropdown-menu-content"
              asChild
              forceMount
              ref={ref}
              {...contentProps}
            >
              <motion.div
                variants={animationVariants}
                initial="init"
                animate="show"
                exit="exit"
                className={contentContainerStyles()}
              >
                <div className={contentStyles(className)}>{children}</div>
              </motion.div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DropdownMenuPrimitive.Root>
  )
}

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

type DropdownMenuSubProps = {
  subProps?: DropdownMenuPrimitive.DropdownMenuSubProps
  contentProps?: DropdownMenuPrimitive.DropdownMenuSubContentProps
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  ref?: React.Ref<HTMLDivElement>
}

export function DropdownMenuSub({
  subProps,
  contentProps,
  trigger,
  children,
  className,
  open: _open,
  onOpenChange: _onOpenChange,
  ref,
}: DropdownMenuSubProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })
  return (
    <DropdownMenuPrimitive.Sub
      open={open}
      onOpenChange={onOpenChange}
      {...subProps}
    >
      <DropdownMenuPrimitive.SubTrigger asChild>
        <div className={itemStyles({ className })}>
          {trigger}
          <DropdownMenuRightSlot>
            <ArrowRight16 />
          </DropdownMenuRightSlot>
        </div>
      </DropdownMenuPrimitive.SubTrigger>
      <AnimatePresence>
        {open ? (
          <DropdownMenuPrimitive.Portal forceMount>
            <DropdownMenuPrimitive.SubContent
              asChild
              forceMount
              ref={ref}
              {...contentProps}
            >
              <motion.div
                variants={animationVariants}
                initial="init"
                animate="show"
                exit="exit"
                className={contentContainerStyles()}
              >
                <div className={contentStyles(className)}>{children}</div>
              </motion.div>
            </DropdownMenuPrimitive.SubContent>
          </DropdownMenuPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DropdownMenuPrimitive.Sub>
  )
}

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuSeparatorProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={separatorStyles(className)}
      {...props}
    />
  )
}

export function DropdownMenuItem({
  className,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={itemStyles({ className })}
      {...props}
    />
  )
}

export function DropdownMenuLabel({
  className,
  ref,
  ...props
}: DropdownMenuPrimitive.DropdownMenuLabelProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cx('px-1.5', labelStyles({ className }))}
      {...props}
    />
  )
}

export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export function DropdownMenuRightSlot({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      className={cx([
        'ml-auto',
        'pl-5',
        'opacity-70 group-hover:opacity-100',
        className,
      ])}
      {...props}
    />
  )
}

export function DropdownMenuLeftSlot({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <div
      ref={ref}
      className={cx(['pr-2', 'opacity-70 group-hover:opacity-100', className])}
      {...props}
    />
  )
}
