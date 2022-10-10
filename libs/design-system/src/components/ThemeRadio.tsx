import React from 'react'
import { useTheme } from '../hooks/useTheme'
import { useCallback } from 'react'
import { styled, CSS } from '../config/theme'
import { Asleep16, Awake16, Screen16 } from '../icons'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Text } from '../core/Text'
import { Box } from '../core/Box'
import { Tooltip } from '../core/Tooltip'

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
      color: '$gray9',
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
        <Tooltip sideOffset={16} content="System">
          <Box css={{ color: '$textContrast' }}>
            <Screen16 />
          </Box>
        </Tooltip>
      </RadioCard>
      <RadioCard value="light" css={radioCardCss}>
        <Tooltip sideOffset={16} content="Light">
          <Box css={{ color: '$textContrast' }}>
            <Awake16 />
          </Box>
        </Tooltip>
      </RadioCard>
      <RadioCard value="dark" css={radioCardCss}>
        <Tooltip sideOffset={16} content="Dark">
          <Box css={{ color: '$textContrast' }}>
            <Asleep16 />
          </Box>
        </Tooltip>
      </RadioCard>
    </RadioCardGroup>
  )
}
