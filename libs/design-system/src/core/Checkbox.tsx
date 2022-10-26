import React from 'react'
import { styled, CSS, VariantProps } from '../config/theme'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Checkmark16 } from '../icons/carbon'
import { Text } from './Text'
import { Flex } from './Flex'

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  alignItems: 'center',
  appearance: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  color: '$hiContrast',
  boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  overflow: 'hidden',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$accentActive',
    },
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$red7',
    boxShadow: '$colors$borderFocus, 0 0 0 1px $colors$accentInput',
  },
  '&:disabled': {
    color: '$gray8',
    boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  },

  variants: {
    size: {
      '1': {
        width: '$2',
        height: '$2',
        borderRadius: '$1',
      },
      '2': {
        width: '$3',
        height: '$3',
        borderRadius: '$1',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
})

type CheckboxPrimitiveProps = React.ComponentProps<
  typeof CheckboxPrimitive.Root
>
type CheckboxVariants = VariantProps<typeof StyledCheckbox>
type CheckboxProps = CheckboxPrimitiveProps & CheckboxVariants & { css?: CSS }

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof StyledCheckbox>,
  CheckboxProps
>(({ children, ...props }, forwardedRef) => (
  <Flex gap="1">
    <StyledCheckbox {...props} ref={forwardedRef}>
      <StyledIndicator>
        <Checkmark16 />
      </StyledIndicator>
    </StyledCheckbox>
    <Text css={{ color: props.disabled ? '$gray9' : '$hiContrast' }}>
      {children}
    </Text>
  </Flex>
))
