import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

const styles = cva(
  [
    'items-center appearance-none border-0 inline-flex flex-shrink-0 whitespace-nowrap',
    'font-sans font-regular text-sm',
    'justify-center align-middle outline-none p-0 decoration-none select-none',
    'bg-white dark:bg-graydark-200',
    'disabled:bg-white dark:disabled:bg-graydark-200',
    'disabled:pointer-events-none',
    'py-0.5 px-3',
  ],
  {
    variants: {
      variant: {
        inactive: 'bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white',
        active: 'bg-gray-800 dark:bg-gray-800 text-white dark:text-white',
        simple: 'bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white',
        accent: 'bg-accent-800 dark:bg-accent-800 text-white',
      },
      interactive: {
        true: 'cursor-pointer',
      },
      rounded: {
        true: 'rounded-sm',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'simple',
      rounded: true,
    },
  }
)

export const Badge = React.forwardRef<
  HTMLDivElement,
  VariantProps<typeof styles> & React.HTMLAttributes<HTMLDivElement>
>(({ variant, interactive, rounded, className, ...props }, ref) => (
  <div
    {...props}
    className={styles({ variant, interactive, rounded, className })}
    ref={ref}
  />
))
