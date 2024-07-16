import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { textStyles } from './Text'

export const styles = cva(
  [
    'relative appearance-none outline-none',
    'p-2 m-0 w-full',
    'min-h-[80px]',
    textStyles(),
    'tabular-nums',
    'resize-y',
    'rounded',
    'focus:ring ring-blue-500 dark:ring-blue-200',
    'text-gray-1100 dark:text-white',
    'placeholder:text-gray-600 placeholder:dark:text-graydark-500',
    'disabled:text-gray-400 disabled:dark:text-graydark-400',
  ],
  {
    variants: {
      size: {
        small: 'h-7 text-sm px-2',
        medium: 'h-10 text-base px-3',
        large: 'h-12 text-lg px-3',
      },
      variant: {
        default: [
          'border',
          'bg-white dark:bg-graydark-50',
          'autofill:bg-blue-100 autofill:dark:bg-blue-800',
        ],
        ghost: 'bg-transparent',
      },
      state: {
        default: [
          'border-gray-400 dark:border-graydark-400',
          'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
        ],
        invalid: ['border-red-500 dark:border-red-400'],
        valid: ['border-green-500 dark:border-green-400'],
      },
      cursor: {
        default: '',
        text: 'cursor-text',
      },
    },
    defaultVariants: {
      size: 'small',
      variant: 'default',
      cursor: 'default',
      state: 'default',
    },
  },
)

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  VariantProps<typeof styles> &
    Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'size'>
>(({ size, variant, state, cursor, className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={styles({ size, variant, state, cursor, className })}
      {...props}
    />
  )
})
