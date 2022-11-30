import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

const styles = cva(
  [
    'items-center appearance-none inline-flex flex-shrink-0 whitespace-nowrap',
    'font-sans font-regular text-sm',
    'justify-center align-middle outline-none p-0 decoration-none select-none',
    'disabled:pointer-events-none',
    'py-0.5 px-3',
  ],
  {
    variants: {
      variant: {
        active: 'bg-gray-800 dark:bg-gray-800 text-white dark:text-white',
        simple: 'bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-white',
        green: [
          'border',
          '[&>svg]:opacity-50',
          'bg-green-700 dark:bg-green-700',
          'border-green-800/30 dark:border-green-600/70',
          'hover:bg-green-800/90 dark:hover:bg-green-700/90',
          'hover:border-green-800/50 hover:dark:border-green-600',
          'text-white dark:text-white',
        ],
        accent: [
          'border',
          '[&>svg]:opacity-50',
          'bg-green-700 dark:bg-green-700',
          'border-green-800/30 dark:border-green-600/70',
          'hover:bg-green-800/90 dark:hover:bg-green-700/90',
          'hover:border-green-800/50 hover:dark:border-green-600',
          'text-white dark:text-white',
        ],
        red: [
          'border',
          '[&>svg]:opacity-50',
          'bg-red-700 dark:bg-red-700',
          'border-red-800/30 dark:border-red-600/70',
          'hover:bg-red-800/90 dark:hover:bg-red-700/90',
          'hover:border-red-800/50 hover:dark:border-red-600',
          'text-white dark:text-white',
        ],
        gray: [
          'border',
          '[&>svg]:opacity-50',
          'bg-white dark:bg-graydark-200',
          'border-gray-400 dark:border-graydark-400',
          'hover:bg-gray-50 dark:hover:bg-graydark-300',
          'hover:border-gray-500 hover:dark:border-graydark-500',
          'text-gray-1100 dark:text-white',
        ],
        inactive: [
          'border',
          '[&>svg]:opacity-50',
          'bg-white dark:bg-graydark-50',
          'border-gray-400 dark:border-graydark-400',
          'hover:border-gray-500 hover:dark:border-graydark-500',
          'text-gray-1100/30 dark:text-white/30',
          'hover:text-gray-1100/50 hover:dark:text-white/50',
        ],
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
      variant: 'gray',
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
