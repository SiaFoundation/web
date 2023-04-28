import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { Text } from './Text'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const thumbStyles = cva(
  [
    'absolute left-0 rounded-full',
    'transition-transform',
    'bg-white dark:bg-graydark-500',
  ],
  {
    variants: {
      size: {
        small: [
          'w-3 h-3',
          'translate-x-px',
          'data-[state=checked]:translate-x-[9px]',
        ],
        medium: [
          'w-5 h-5',
          'translate-x-0.5',
          'data-[state=checked]:translate-x-[20px]',
        ],
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

const styles = cva(
  [
    'select-none outline-none',
    'relative inline-flex items-center justify-center',
    'm-0 rounded-full',

    'focus:ring ring-blue-500 dark:ring-blue-200',
    'border',
    'bg-gray-300 dark:bg-graydark-50',
    'autofill:bg-blue-100 autofill:dark:bg-blue-800',
    'border-gray-400 dark:border-graydark-400',
    'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
    'disabled:cursor-default',

    'enabled:data-[state=checked]:bg-green-600 dark:enabled:data-[state=checked]:bg-green-500',
    'disabled:data-[state=checked]:bg-green-600/50 dark:disabled:data-[state=checked]:bg-green-500/50',
  ],
  {
    variants: {
      size: {
        small: 'w-6 h-4',
        medium: 'w-11 h-6',
      },
      state: {
        default: [
          'border-gray-400 dark:border-graydark-400',
          'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
        ],
        invalid: ['border-red-500 dark:border-red-400'],
        valid: ['border-green-500 dark:border-green-400'],
      },
    },
    defaultVariants: {
      size: 'small',
      state: 'default',
    },
  }
)

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  VariantProps<typeof styles> & SwitchPrimitive.SwitchProps
>(({ size, state, className, children, ...props }, ref) => (
  <div className="flex gap-2 items-center">
    <SwitchPrimitive.Root
      className={styles({ size, state, className })}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb className={thumbStyles({ size })} />
    </SwitchPrimitive.Root>
    {children && (
      <Text color={props.disabled ? 'subtle' : 'contrast'}>{children}</Text>
    )}
  </div>
))
