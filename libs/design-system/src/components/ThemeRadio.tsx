'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { Asleep16, Awake16, Screen16 } from '../icons/carbon'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Tooltip } from '../core/Tooltip'
import { cx } from 'class-variance-authority'

const RadioCard = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupPrimitive.RadioGroupItemProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    {...props}
    ref={ref}
    className={cx(
      'select-none flex items-center rounded cursor-pointer',
      'focus:ring ring-blue-500 dark:ring-blue-200',
      'text-gray-700 dark:text-graydark-700',
      'data-[state=checked]:text-gray-1100 data-[state=checked]:dark:text-white',
      className
    )}
  />
))

type Props = {
  tabIndex?: number
  className?: string
  tooltipClassName?: string
}

export function ThemeRadio({ className, tooltipClassName, tabIndex }: Props) {
  const { theme, setTheme } = useTheme()
  return (
    <RadioGroupPrimitive.Root
      value={theme}
      tabIndex={tabIndex}
      className={cx('flex gap-4', className)}
      onValueChange={(val) => setTheme(val)}
    >
      <RadioCard value="system">
        <Tooltip className={tooltipClassName} sideOffset={16} content="System">
          <Screen16 />
        </Tooltip>
      </RadioCard>
      <RadioCard value="light">
        <Tooltip className={tooltipClassName} sideOffset={16} content="Light">
          <Awake16 />
        </Tooltip>
      </RadioCard>
      <RadioCard value="dark">
        <Tooltip className={tooltipClassName} sideOffset={16} content="Dark">
          <Asleep16 />
        </Tooltip>
      </RadioCard>
    </RadioGroupPrimitive.Root>
  )
}
