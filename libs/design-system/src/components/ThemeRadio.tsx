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
      className
    )}
  />
))

type Value = 'light' | 'dark' | 'system'

type Props = {
  tabIndex?: number
  className?: string
}

export function ThemeRadio({ className, tabIndex }: Props) {
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
        <Tooltip sideOffset={16} content="System">
          <Text>
            <Screen16 />
          </Text>
        </Tooltip>
      </RadioCard>
      <RadioCard value="light">
        <Tooltip sideOffset={16} content="Light">
          <Text>
            <Awake16 />
          </Text>
        </Tooltip>
      </RadioCard>
      <RadioCard value="dark">
        <Tooltip sideOffset={16} content="Dark">
          <Text>
            <Asleep16 />
          </Text>
        </Tooltip>
      </RadioCard>
    </RadioGroupPrimitive.Root>
  )
}
