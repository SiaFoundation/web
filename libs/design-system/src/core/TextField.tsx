import { cva } from 'class-variance-authority'
import React from 'react'
import { VariantProps } from '../types'

export const textFieldStyles = cva(
  [
    'font-sans [type=number]:font-mono',
    'outline-none m-0 p-0 w-full',
    'disabled:pointer-events-none',
    'tabular-nums',
    'rounded',
    'text-gray-1100 dark:text-white',
    'autofill:text-fill-gray-1100 autofill:dark:text-fill-white',
    'autofill:placeholder:text-fill-gray-700 autofill:placeholder:dark:text-fill-graydark-700',
    'placeholder:text-gray-700 placeholder:dark:text-graydark-700',
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
          'autofill:bg-white autofill:dark:bg-graydark-50',
          'autofill:shadow-fill-white autofill:dark:shadow-fill-graydark-50',
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
      focus: {
        default: ['focus:ring ring-blue-500 dark:ring-blue-200', 'focus:z-10'],
        none: '',
      },
      cursor: {
        default: '',
        text: 'cursor-text',
      },
      noSpin: {
        true: '[&::-webkit-outer-spin-button, &::-webkit-inner-spin-button]:appearance-none',
      },
    },
    defaultVariants: {
      size: 'small',
      focus: 'default',
      variant: 'default',
      cursor: 'default',
      state: 'default',
    },
  }
)

export const TextField = React.forwardRef<
  HTMLInputElement,
  VariantProps<typeof textFieldStyles> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'>
>(
  (
    { variant, size, state, noSpin, cursor, focus, className, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={textFieldStyles({
          variant,
          size,
          state,
          noSpin,
          cursor,
          focus,
          className,
        })}
        {...props}
      />
    )
  }
)
