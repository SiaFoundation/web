'use client'

import React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cx } from 'class-variance-authority'
import { radioIndicatorStyles, radioStyles } from './Radio'

export function RadioCardGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cx('block', className)} {...props} />
  )
}

export const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupPrimitive.RadioGroupItemProps & {
    indicator?: boolean
  }
>(({ indicator = true, ...props }, forwardedRef) => (
  <RadioGroupPrimitive.Item
    {...props}
    ref={forwardedRef}
    className={cx(
      'select-none flex items-center gap-4 rounded py-4 px-4',

      'focus:ring ring-blue-500 dark:ring-blue-200',
      'border',
      'bg-gray-200 dark:bg-graydark-50',
      'border-gray-400 dark:border-graydark-400',
      'enabled:hover:border-gray-500 enabled:hover:dark:border-graydark-500',
      'disabled:cursor-default',

      'enabled:data-[state=checked]:ring',
      'enabled:data-[state=checked]:ring-green-600 dark:enabled:data-[state=checked]:ring-green-500',
      'disabled:data-[state=checked]:ring-green-600/50 dark:disabled:data-[state=checked]:ring-green-500/50'
    )}
  >
    {indicator && (
      <div>
        <div
          className={radioStyles({
            size: 'medium',
          })}
        >
          <RadioGroupPrimitive.Indicator
            className={radioIndicatorStyles({ size: 'medium' })}
          />
        </div>
      </div>
    )}
    <div className="flex-1">{props.children}</div>
  </RadioGroupPrimitive.Item>
))
