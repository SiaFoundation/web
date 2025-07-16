'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Text } from './Text'
import { cva, cx } from 'class-variance-authority'
import { VariantProps } from '../types'

export const radioIndicatorStyles = cva(
  [
    'relative flex items-center h-full justify-center w-full',
    'after:content-[""] after:block after:rounded-full after:bg-green-600 after:dark:bg-green-500',
  ],
  {
    variants: {
      size: {
        small: 'after:w-2 after:h-2 ',
        medium: 'after:w-4 after:h-4',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

export const radioStyles = cva(
  [
    'select-none',
    'inline-flex items-center justify-center',
    'm-0 p-0',
    'outline-none',
    'rounded-full',
    'overflow-hidden',
    'focus:ring ring-blue-500 dark:ring-blue-200',
    'bg-white dark:bg-graydark-200',
    'border border-gray-500 dark:border-graydark-400',
    'enabled:hover:border-gray-700 enabled:hover:dark:border-graydark-600',
    'text-gray-1100 dark:text-white',
    'disabled:text-gray-600 disabled:dark:text-graydark-400',
    'disabled:bg-gray-200 disabled:dark:bg-graydark-200',
  ],
  {
    variants: {
      size: {
        small: 'w-4 h-4',
        medium: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
)

export function Radio({
  size,
  className,
  children,
  ref,
  ...props
}: VariantProps<typeof radioStyles> &
  RadioGroupPrimitive.RadioGroupItemProps & {
    ref?: React.Ref<HTMLButtonElement>
  }) {
  return (
    <div className="flex gap-2 items-center">
      <RadioGroupPrimitive.Item
        {...props}
        className={radioStyles({ size, className })}
        ref={ref}
      >
        <RadioGroupPrimitive.Indicator
          className={radioIndicatorStyles({ size })}
        />
      </RadioGroupPrimitive.Item>
      <Text
        size="14"
        className="relative top-px flex items-center"
        color={props.disabled ? 'verySubtle' : 'subtle'}
      >
        {children}
      </Text>
    </div>
  )
}

export function RadioGroup({
  className,
  ref,
  ...props
}: RadioGroupPrimitive.RadioGroupProps & {
  ref?: React.Ref<HTMLDivElement>
}) {
  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      className={cx('flex gap-2', className)}
      ref={ref}
    />
  )
}
