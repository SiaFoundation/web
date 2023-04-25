import { cva } from 'class-variance-authority'
import React from 'react'
import { CaretSort16 } from '../icons/carbon'
import { VariantProps } from '../types'

const containerStyles = cva(
  [
    'font-sans',
    'font-normal',
    'tabular-nums',
    'flex-shrink-0',
    'rounded',
    'flex items-center',

    'bg-white dark:bg-graydark-200',
    'hover:bg-gray-50 dark:hover:bg-graydark-300',
    'disabled:bg-gray-200 disabled:dark:bg-graydark-200',
    'autofill:bg-blue-100 autofill:dark:bg-blue-800',
    'border',
    'border-gray-400 dark:border-graydark-400',
    'hover:border-gray-500 hover:dark:border-graydark-500',
    'focus-within:z-10',
    'focus-within:ring ring-blue-500 dark:ring-blue-200',
    'text-gray-1100 dark:text-white',
    '[&>select:disabled]:text-gray-600 [&>select:disabled]:dark:text-graydark-700',
  ],
  {
    variants: {
      size: {
        small: 'h-7 text-sm px-1',
        medium: 'h-10 text-base px-3',
        large: 'h-12 text-lg px-3',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

// TODO: convert to radix select

export const Select = React.forwardRef<
  HTMLSelectElement,
  VariantProps<typeof containerStyles> &
    React.HTMLAttributes<HTMLSelectElement> & {
      icon?: React.ReactNode
      value?: string
      disabled?: boolean
    }
>(({ size, icon, className, ...props }, ref) => (
  <div className={containerStyles({ size, className })}>
    {icon}
    <select
      ref={ref}
      {...props}
      className="appearance-none flex-1 bg-transparent outline-none w-full h-full pl-1 pr-1"
    />
    <CaretSort16 className="pointer-events-none scale-75" />
  </div>
))
