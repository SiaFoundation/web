'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Close24 } from '@siafoundation/react-icons'
import { cva, cx } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useOpen } from '../hooks/useOpen'
import type { VariantProps } from '../types'
import { Button } from './Button'
import { panelStyles } from './Panel'
import { ScrollArea } from './ScrollArea'
import { textStyles } from './Text'

const containerStyles = cva(['z-20', 'overflow-hidden'], {
  variants: {
    variant: {
      default: 'flex items-center justify-center w-full h-full',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const animationVariants = {
  show: {
    scale: [0.95, 1],
    transition: { duration: 0.1, ease: 'easeOut' },
  },
  exit: {
    opacity: [1, 0],
    scale: [1, 0.95],
    transition: { duration: 0.1, ease: 'easeIn' },
  },
}

export const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  {
    rootProps?: React.ComponentProps<typeof DialogPrimitive.Root>
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    containerVariants?: VariantProps<typeof containerStyles>
  } & ContentProps
>(
  (
    {
      trigger,
      rootProps,
      open: _open,
      onOpenChange: _onOpenChange,
      onSubmit,
      title,
      description,
      containerVariants,
      contentVariants,
      controls,
      children,
      bodyClassName,
      closeClassName,
      dynamicHeight = true,
    },
    ref,
  ) => {
    const { open, onOpenChange } = useOpen({
      open: _open,
      onOpenChange: _onOpenChange,
    })

    // The dialog itself only triggers on internal open state change
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (open) {
        onOpenChange(open)
      }
    }, [open])

    return (
      <DialogPrimitive.Root
        open={open}
        onOpenChange={onOpenChange}
        {...rootProps}
      >
        {trigger && (
          <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        )}
        <AnimatePresence>
          {open ? (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Content asChild forceMount ref={ref}>
                <div className="fixed w-full h-full top-0 left-0 z-20">
                  <DialogPrimitive.Overlay
                    onClick={() => onOpenChange(false)}
                    className="fixed z-10 top-0 right-0 bottom-0 left-0 inset-0 transition-opacity opacity-0 open:opacity-10 dark:open:opacity-20 bg-black"
                  />
                  <motion.div
                    variants={animationVariants}
                    initial="init"
                    animate="show"
                    exit="exit"
                    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                    className={containerStyles(containerVariants as any)}
                  >
                    <Content
                      title={title}
                      description={description}
                      contentVariants={contentVariants}
                      onSubmit={onSubmit}
                      controls={controls}
                      bodyClassName={bodyClassName}
                      closeClassName={closeClassName}
                      dynamicHeight={dynamicHeight}
                    >
                      {children}
                    </Content>
                  </motion.div>
                </div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          ) : null}
        </AnimatePresence>
      </DialogPrimitive.Root>
    )
  },
)

export function DialogClose({ className }: { className?: string }) {
  return (
    <DialogPrimitive.Close asChild type="button">
      <div className={cx('appearance-none', className)}>
        <Button size="small" variant="ghost" type="button" aria-label="close">
          <Close24 />
        </Button>
      </div>
    </DialogPrimitive.Close>
  )
}

const contentStyles = cva(['relative', 'z-40', 'overflow-hidden'], {
  variants: {
    variant: {
      default: [panelStyles()],
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ContentProps = {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  title?: React.ReactNode
  description?: React.ReactNode
  controls?: React.ReactNode
  children?: React.ReactNode
  contentVariants?: VariantProps<typeof contentStyles>
  closeClassName?: string
  bodyClassName?: string
  dynamicHeight?: boolean
}

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      children,
      onSubmit,
      title,
      description,
      controls,
      contentVariants,
      closeClassName,
      bodyClassName,
      dynamicHeight = true,
    },
    ref,
  ) => {
    const { ref: heightRef, height } = useHeight([children, description])
    const [showSeparator, setShowSeparator] = useState<boolean>(false)
    useEffect(() => {
      // 0.7 is eual to the maxHeight: 70vh below
      setShowSeparator(height > window.innerHeight * 0.7)
    }, [height])
    const Tag = onSubmit ? 'form' : 'div'
    return (
      <Tag
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onSubmit={onSubmit as any}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ref={ref as any}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        className={contentStyles(contentVariants as any)}
      >
        {title && (
          <DialogPrimitive.Title
            className={dialogTitleStyles({ showSeparator })}
          >
            {title}
          </DialogPrimitive.Title>
        )}
        <ScrollArea
          style={{
            height: dynamicHeight ? `${height}px` : undefined,
            maxHeight: dynamicHeight ? '70vh' : undefined,
          }}
        >
          <div ref={heightRef} className={cx('p-4', bodyClassName)}>
            {description && (
              <DialogPrimitive.Description
                className={dialogDescriptionStyles()}
              >
                {description}
              </DialogPrimitive.Description>
            )}
            {children}
          </div>
        </ScrollArea>
        {controls && (
          <DialogControls separator={showSeparator}>{controls}</DialogControls>
        )}
        <DialogClose className={closeClassName || 'absolute top-3.5 right-2'} />
      </Tag>
    )
  },
)

function useHeight(deps: unknown[] = []) {
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const node = ref.current
    const update = () => setHeight(node.clientHeight)
    update()
    ref.current.addEventListener('resize', update)
    const resizeOb = new ResizeObserver(update)
    resizeOb.observe(node)

    return () => {
      node.removeEventListener('resize', update)
      resizeOb.unobserve(node)
    }
  }, deps)
  return {
    ref,
    height,
  }
}

export const dialogTitleStyles = cva(
  [
    'pt-4 pb-2 px-4 w-full',
    textStyles({
      size: '20',
      weight: 'semibold',
      font: 'sans',
      color: 'contrast',
    }),
  ],
  {
    variants: {
      showSeparator: {
        true: 'border-b border-gray-200 dark:border-graydark-200',
      },
    },
  },
)

export const dialogDescriptionStyles = cva([
  textStyles({
    color: 'subtle',
    size: '14',
  }),
  'py-2',
])

type DialogControlsProps = {
  children: React.ReactNode
  separator?: boolean
}

function DialogControls({ children, separator = true }: DialogControlsProps) {
  return (
    <div
      className={cx(
        'py-2 mx-3',
        separator ? 'border-t border-gray-200 dark:border-graydark-200' : '',
      )}
    >
      {children}
    </div>
  )
}
