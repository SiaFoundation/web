import { DropdownMenuRightSlot } from '../core/DropdownMenu'
import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { Asleep16, Awake16, Screen16 } from '../icons'
import { RadioCard, RadioCardGroup } from '../core/RadioCard'
import { Text } from '../core/Text'
import { CSS } from '../config/theme'
import { Flex } from '../core/Flex'

const css: CSS = {
  color: 'whiteA7',

  [`& *, & ${Text}`]: {
    color: '$whiteA10',
  },

  [`&[data-state="checked"]`]: {
    color: 'white',
  },

  [`&[data-state="checked"] *, &[data-state="checked"] ${Text}`]: {
    color: 'white',
  },
}

type Value = 'light' | 'dark' | 'system'

export function ThemeRadio() {
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
    <RadioCardGroup
      value={active}
      onValueChange={(val) => onChange(val as Value)}
    >
      <RadioCard value="system" css={css}>
        <Flex direction="column" align="center" gap="1">
          <Screen16 />
          <Text>System</Text>
        </Flex>
      </RadioCard>
      <RadioCard value="light" css={css}>
        <Flex direction="column" align="center" gap="1">
          <Awake16 />
          <Text>Light</Text>
        </Flex>
      </RadioCard>
      <RadioCard value="dark" css={css}>
        <Flex direction="column" align="center" gap="1">
          <Asleep16 />
          <Text>Dark</Text>
        </Flex>
      </RadioCard>
    </RadioCardGroup>
  )
}
