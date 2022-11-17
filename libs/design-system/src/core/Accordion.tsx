import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown16 } from '../icons/carbon'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

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

const triggerStyles = cva(
  [
    'select-none flex items-center justify-between text-gray-900 dark:text-graydark-900 w-full cursor-pointer focus:outline-none [&>svg]:open:rotate-180',
  ],
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-100 dark:hover:bg-graydark-100',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Trigger = React.forwardRef<
  HTMLButtonElement,
  VariantProps<typeof triggerStyles> & AccordionPrimitive.AccordionTriggerProps
>(({ variant, className, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    {...props}
    className={triggerStyles({ variant, className })}
    ref={ref}
  />
))

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentProps<typeof Trigger>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <Trigger {...props} ref={ref}>
      {children}
      <ChevronDown16 />
    </Trigger>
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
