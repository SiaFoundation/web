'use client'

import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown16 } from '../icons/carbon'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'
import { Button } from './Button'

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentProps<typeof AccordionPrimitive.Root>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    {...props}
    {...(props.type === 'single' ? { collapsible: true } : {})}
  >
    {children}
  </AccordionPrimitive.Root>
))

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionPrimitive.AccordionTriggerProps
>(({ children, ...props }, ref) => (
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
))

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

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  VariantProps<typeof itemStyles> & AccordionPrimitive.AccordionItemProps
>(({ variant, className, ...props }, ref) => (
  <AccordionPrimitive.Item
    {...props}
    className={itemStyles({ variant, className })}
    ref={ref}
  />
))

export const AccordionContent = AccordionPrimitive.Content
