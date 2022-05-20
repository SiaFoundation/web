import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { styled, CSS } from '../config/theme'
import { Asleep16, Awake16, Screen16 } from '../icons'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Text } from '../core/Text'
import { Flex } from '../core/Flex'
import { Box } from '../core/Box'

const RadioCardGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',
  gap: '$3',
})

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'flex',
  alignItems: 'center',
  borderRadius: '$2',
  cursor: 'pointer',
})

type RadioGroupItemPrimitiveProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
type RadioCardProps = RadioGroupItemPrimitiveProps & { css?: CSS }

const RadioCard = React.forwardRef<
  React.ElementRef<typeof StyledRadio>,
  RadioCardProps
>((props, forwardedRef) => (
  <StyledRadio {...props} ref={forwardedRef}>
    {props.children}
  </StyledRadio>
))

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
