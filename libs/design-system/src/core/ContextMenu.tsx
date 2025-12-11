'use client'

import { AnimatePresence, motion, Variants } from 'motion/react'
import { cva, cx } from 'class-variance-authority'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
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
    }),
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

type ContextMenuProps = {
  ref?: React.RefObject<HTMLDivElement>
  label?: string
  rootProps?: React.ComponentProps<typeof ContextMenuPrimitive.Root>
  contentProps?: React.ComponentProps<typeof ContextMenuPrimitive.Content>
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ContextMenu({
  ref,
  label,
  rootProps,
  contentProps,
  trigger,
  children,
  className,
  open: _open,
  onOpenChange: _onOpenChange,
}: ContextMenuProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })

  return (
    <ContextMenuPrimitive.Root onOpenChange={onOpenChange} {...rootProps}>
      <ContextMenuPrimitive.Trigger asChild aria-label={label}>
        {trigger}
      </ContextMenuPrimitive.Trigger>
      <AnimatePresence>
        {open ? (
          <ContextMenuPrimitive.Portal forceMount>
            <ContextMenuPrimitive.Content
              data-testid="context-menu-content"
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
            </ContextMenuPrimitive.Content>
          </ContextMenuPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </ContextMenuPrimitive.Root>
  )
}

export const ContextMenuTrigger = ContextMenuPrimitive.Trigger

type ContextMenuSubProps = {
  subProps?: ContextMenuPrimitive.ContextMenuSubProps
  contentProps?: ContextMenuPrimitive.ContextMenuSubContentProps
  trigger: React.ReactNode
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  ref?: React.Ref<HTMLDivElement>
}

export function ContextMenuSub({
  subProps,
  contentProps,
  trigger,
  children,
  className,
  open: _open,
  onOpenChange: _onOpenChange,
  ref,
}: ContextMenuSubProps) {
  const { open, onOpenChange } = useOpen({
    open: _open,
    onOpenChange: _onOpenChange,
  })
  return (
    <ContextMenuPrimitive.Sub
      open={open}
      onOpenChange={onOpenChange}
      {...subProps}
    >
      <ContextMenuPrimitive.SubTrigger asChild>
        <div className={itemStyles({ className })}>
          {trigger}
          <ContextMenuRightSlot>
            <ArrowRight16 />
          </ContextMenuRightSlot>
        </div>
      </ContextMenuPrimitive.SubTrigger>
      <AnimatePresence>
        {open ? (
          <ContextMenuPrimitive.Portal forceMount>
            <ContextMenuPrimitive.SubContent
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
            </ContextMenuPrimitive.SubContent>
          </ContextMenuPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </ContextMenuPrimitive.Sub>
  )
}

export function ContextMenuSeparator({
  className,
  ref,
  ...props
}: ContextMenuPrimitive.ContextMenuSeparatorProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={separatorStyles(className)}
      {...props}
    />
  )
}

export function ContextMenuItem({
  className,
  ref,
  ...props
}: ContextMenuPrimitive.ContextMenuItemProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={itemStyles({ className })}
      {...props}
    />
  )
}

export function ContextMenuLabel({
  className,
  ref,
  ...props
}: ContextMenuPrimitive.ContextMenuLabelProps & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cx('px-1.5', labelStyles({ className }))}
      {...props}
    />
  )
}

export const ContextMenuGroup = ContextMenuPrimitive.Group

export function ContextMenuRightSlot({
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

export function ContextMenuLeftSlot({
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
