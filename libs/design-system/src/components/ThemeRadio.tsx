import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { Asleep16, Awake16, Screen16 } from '../icons/carbon'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Text } from '../core/Text'
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

type Value = 'light' | 'dark' | 'system'

type Props = {
  tabIndex?: number
  className?: string
  tooltipClassName?: string
}

export function ThemeRadio({ className, tooltipClassName, tabIndex }: Props) {
  const { activeTheme, activeMode, setTheme, setMode } = useTheme()

  const active = activeMode === 'system' ? 'system' : activeTheme

  const onChange = useCallback(
    (val: Value) => {
      if (val === 'system') {
        setMode('system')
      } else {
        setMode('user')
        setTheme(val as 'light' | 'dark')
      }
    },
    [setMode, setTheme]
  )

  return (
    <RadioGroupPrimitive.Root
      value={active}
      tabIndex={tabIndex}
      className={cx('flex gap-6', className)}
      onValueChange={(val) => onChange(val as Value)}
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
