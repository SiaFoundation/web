'use client'

import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Checkmark16 } from '@siafoundation/react-icons'
import { Text } from './Text'
import { cva } from 'class-variance-authority'
import { VariantProps } from '../types'

const styles = cva(
  [
    'select-none appearance-none outline-none overflow-hidden',
    'inline-flex items-center justify-center',

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
        small: 'w-4 h-4 rounded',
        medium: 'w-6 h-6 rounded',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  VariantProps<typeof styles> & CheckboxPrimitive.CheckboxProps
>(({ size, children, ...props }, ref) => (
  <div className="flex gap-2 items-center">
    <CheckboxPrimitive.Root className={styles({ size })} {...props} ref={ref}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center h-full w-full text-white">
        <Checkmark16 />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <Text color={props.disabled ? 'subtle' : 'contrast'}>{children}</Text>
  </div>
))
