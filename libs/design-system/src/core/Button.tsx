import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

export const buttonStyles = cva(
  [
    'inline-flex',
    'gap-1',
    'appearance-none',
    'shrink-0',
    'items-center',
    'justify-center',
    'select-none',
    'leading-normal',
    'font-sans',
    // 'font-medium',
    'cursor-pointer',
    'overflow-hidden',
    'focus:z-10',
    'hover:z-10',
    // 'ml-px',
    'disabled:cursor-auto',
    'disabled:pointer-events-none',
    'outline-none',
    'focus:ring ring-blue-500 dark:ring-blue-200',
    'transition-colors duration-75',
    // '[&>svg]:-mx-0.5',
  ],
  {
    variants: {
      size: {
        small: ['text-xs', 'px-2', 'h-7'],
        medium: ['text-base', 'px-4', 'h-10'],
        large: ['text-lg', 'px-4', 'h-12'],
        none: [],
      },
      state: {
        waiting: ['pointer-events-none'],
      },
      disabled: {
        true: 'cursor-auto pointer-events-none',
      },
      rounded: {
        true: 'rounded',
        false: '',
      },
      variant: {
        accent: [
          'border',
          // enabled
          'text-white dark:text-white',
          'enabled:bg-green-700 enabled:dark:bg-green-700',
          'enabled:border-green-800/30 enabled:dark:border-green-600/70',
          'enabled:hover:bg-green-800/90 dark:enabled:hover:bg-green-700/90',
          'enabled:hover:border-green-800/50 enabled:hover:dark:border-green-600',
          // disabled
          'disabled:text-white/50 disabled:dark:text-white/50',
          'disabled:bg-green-700/70 disabled:dark:bg-green-600/70',
          'disabled:border-green-600/50 disabled:dark:border-green-500/30',
          // the enabled class does not work for buttons that are links (<a />)
          '[&[href]]:bg-green-700 [&[href]]:dark:bg-green-700',
          '[&[href]]:border-green-800/30 [&[href]]:dark:border-green-600/70',
          '[&[href]]:hover:bg-green-800/90 dark:[&[href]]:hover:bg-green-700/90',
          '[&[href]]:hover:border-green-800/50 [href]]:hover:dark:border-green-600',
        ],
        red: [
          'border',
          'bg-red-700 dark:bg-red-700',
          'border-red-800/30 dark:border-red-600/70',
          'enabled:hover:bg-red-800/90 dark:enabled:hover:bg-red-700/90',
          'enabled:hover:border-red-800/50 enabled:hover:dark:border-red-600',
          'disabled:bg-red-700/70 disabled:dark:bg-red-600/70',
          'disabled:border-red-600/50 disabled:dark:border-red-500/30',
          'text-white dark:text-white',
          'disabled:text-white/50 disabled:dark:text-white/50',
        ],
        amber: [
          'border',
          'bg-amber-700 dark:bg-amber-700',
          'border-amber-800/30 dark:border-amber-600/70',
          'enabled:hover:bg-amber-800/90 dark:enabled:hover:bg-amber-700/90',
          'enabled:hover:border-amber-800/50 enabled:hover:dark:border-amber-600',
          'disabled:bg-amber-700/70 disabled:dark:bg-amber-600/70',
          'disabled:border-amber-600/50 disabled:dark:border-amber-500/30',
          'text-white dark:text-white',
          'disabled:text-white/50 disabled:dark:text-white/50',
        ],
        gray: [
          'border',
          'bg-white dark:bg-graydark-200',
          'enabled:hover:bg-gray-50 dark:enabled:hover:bg-graydark-300',
          'disabled:bg-gray-200 disabled:dark:bg-graydark-200',
          'border-gray-400 dark:border-graydark-400',
          'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
          'text-gray-1100 dark:text-gray-300',
          'disabled:text-gray-600 disabled:dark:text-graydark-700',
        ],
        active: [
          'border',
          'bg-gray-200 dark:bg-graydark-400',
          'enabled:hover:bg-gray-50 dark:enabled:hover:bg-graydark-300',
          'disabled:bg-gray-200 disabled:dark:bg-graydark-200',
          'border-gray-500 dark:border-graydark-500',
          'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
          'text-gray-1100 dark:text-white',
          'disabled:text-gray-600 disabled:dark:text-graydark-700',
        ],
        inactive: [
          'border',
          'bg-white dark:bg-graydark-200',
          'enabled:hover:bg-gray-50 dark:enabled:hover:bg-graydark-300',
          'disabled:bg-gray-200 disabled:dark:bg-graydark-200',
          'border-gray-400/70 dark:border-graydark-400/70',
          'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
          'text-gray-1100/30 dark:text-white/30',
          'enabled:hover:text-gray-1100 enabled:hover:dark:text-white',
          'disabled:text-gray-600 disabled:dark:text-graydark-700',
        ],
        ghost: [
          'appearance-none border-none bg-transparent',
          'text-gray-1100 dark:text-white',
          'disabled:text-gray-600 disabled:dark:text-graydark-700',
        ],
        state: [
          'open:text-gray-1100 open:dark:text-white',
          'hover:text-gray-1000 hover:dark:text-graydark-1000',
          'text-gray-700 dark:text-graydark-800',
        ],
      },
      icon: {
        contrast: '',
        hover:
          '[&>svg]:opacity-50 hover:[&>svg]:opacity-100 transition-opacity',
        subtle: '[&>svg]:opacity-50',
      },
    },
    defaultVariants: {
      variant: 'gray',
      size: 'small',
      rounded: true,
      icon: 'subtle',
    },
  }
)

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyles>
>(
  (
    { variant, size, state, rounded, disabled, icon, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={buttonStyles({
          variant,
          size,
          state,
          rounded,
          disabled,
          icon,
          className,
        })}
        {...props}
      />
    )
  }
)
