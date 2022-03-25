import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { Asleep16, Awake16, Screen16 } from '../icons'
import { RadioCard, RadioCardGroup } from '../core/RadioCard'
import { Text } from '../core/Text'
import { CSS } from '../config/theme'
import { Flex } from '../core/Flex'
import { Box } from '../core/Box'

type Value = 'light' | 'dark' | 'system'

type Props = {
  css?: CSS
  radioCss?: CSS
}

export function ThemeRadio({ css, radioCss }: Props) {
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

  const radioCardCss: CSS = {
    [`& *, & ${Text}`]: {
      color: '$brandGray9',
    },

    [`&[data-state="checked"] *, &[data-state="checked"] ${Text}`]: {
      color: '$textContrast',
    },

    ...radioCss,
  }

  return (
    <RadioCardGroup
      value={active}
      onValueChange={(val) => onChange(val as Value)}
      css={css}
    >
      <RadioCard value="system" css={radioCardCss}>
        <Flex direction="column" align="center" gap="1">
          <Box css={{ color: '$textContrast' }}>
            <Screen16 />
          </Box>
          <Text>System</Text>
        </Flex>
      </RadioCard>
      <RadioCard value="light" css={radioCardCss}>
        <Flex direction="column" align="center" gap="1">
          <Box css={{ color: '$textContrast' }}>
            <Awake16 />
          </Box>
          <Text>Light</Text>
        </Flex>
      </RadioCard>
      <RadioCard value="dark" css={radioCardCss}>
        <Flex direction="column" align="center" gap="1">
          <Box css={{ color: '$textContrast' }}>
            <Asleep16 />
          </Box>
          <Text>Dark</Text>
        </Flex>
      </RadioCard>
    </RadioCardGroup>
  )
}
