'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'
import { Button } from './Button'
import { ChevronDown16 } from '@siafoundation/react-icons'

export function Accordion({
  ref,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> & {
  ref?: React.RefObject<HTMLDivElement>
}) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      {...props}
      {...(props.type === 'single' ? { collapsible: true } : {})}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

export function AccordionTrigger({
  ref,
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger {...props} asChild ref={ref}>
        <Button
          variant="ghost"
          size="none"
          className="w-full flex gap-2 justify-between"
        >
          <span className="flex-1 text-left">{children}</span>
          <span className="pr-3">
            <ChevronDown16 />
          </span>
        </Button>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

const itemStyles = cva([], {
  variants: {
    variant: {
      default:
        'border-t border-gray-500 dark:border-graydark-500 last-of-type:border-b',
      ghost: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export function AccordionItem({
  ref,
  variant,
  className,
  ...props
}: VariantProps<typeof itemStyles> &
  AccordionPrimitive.AccordionItemProps & {
    ref?: React.RefObject<HTMLDivElement>
  }) {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={itemStyles({ variant, className })}
      ref={ref}
    />
  )
}

export const AccordionContent = AccordionPrimitive.Content
