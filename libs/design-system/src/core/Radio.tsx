import React from 'react'
import { styled, CSS, VariantProps } from '../config/theme'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Flex } from '../core/Flex'
import { Text } from '../core/Text'

export const RadioGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',
})

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '$accent9',
  },
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
  alignItems: 'center',
  appearance: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  borderRadius: '50%',
  color: '$hiContrast',
  boxShadow: '$colors$border, $colors$shadow',
  overflow: 'hidden',
  '@hover': {
    '&:hover': {
      boxShadow: '$colors$borderAccentHover, $colors$shadow',
    },
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '$colors$borderAccentActive, $colors$shadowActive',
  },

  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$brandGray2',
    color: '$brandGray8',
    cursor: 'not-allowed',
  },

  variants: {
    size: {
      '1': {
        width: '$2',
        height: '$2',
      },
      '2': {
        width: '$3',
        height: '$3',

        [`& ${StyledIndicator}`]: {
          '&::after': {
            width: '15px',
            height: '15px',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})

type RadioVariants = VariantProps<typeof StyledRadio>
type RadioGroupItemPrimitiveProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
type RadioProps = RadioGroupItemPrimitiveProps &
  RadioVariants & { css?: CSS; children: React.ReactNode }

export const Radio = React.forwardRef<
  React.ElementRef<typeof StyledRadio>,
  RadioProps
>(({ children, ...props }, forwardedRef) => (
  <Flex gap="1" align="center">
    <StyledRadio {...props} ref={forwardedRef}>
      <StyledIndicator />
    </StyledRadio>
    <Text
      css={{
        position: 'relative',
        top: '1px',
        display: 'flex',
        alignItems: 'center',
        color: props.disabled ? '$gray9' : '$hiContrast',
      }}
    >
      {children}
    </Text>
  </Flex>
))
