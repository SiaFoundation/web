import React from 'react'
import { styled, CSS } from '../config/theme'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

export const RadioCardGroup = styled(RadioGroupPrimitive.Root, {
  display: 'block',
})

const StyledRadioButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$round',
  width: 25,
  height: 25,
  boxShadow: 'inset 0 0 0 1px $colors$gray7',
  flexShrink: 0,
  mr: '$3',
})

const StyledRadioIndicator = styled('div', {
  borderRadius: '$round',
  width: 15,
  height: 15,
  backgroundColor: '$accent9',
  transform: 'scale(0)',
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
  p: '$3',
  boxShadow: '$colors$selectableBorder, $colors$shadow',
  '@hover': {
    '&:hover': {
      boxShadow: '$colors$selectableBorderHover, $colors$shadow',
    },
  },
  '&[data-state="checked"]': {
    boxShadow: '$colors$selectableBorderActive, $colors$shadowActive',
    [`& ${StyledRadioIndicator}`]: {
      transform: 'scale(1)',
    },
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$gray2',
    opacity: '0.5',
    cursor: 'not-allowed',
  },
})

type RadioGroupItemPrimitiveProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
type RadioCardProps = RadioGroupItemPrimitiveProps & {
  indicator?: boolean
  css?: CSS
}

export const RadioCard = React.forwardRef<
  React.ElementRef<typeof StyledRadio>,
  RadioCardProps
>(({ indicator = true, ...props }, forwardedRef) => (
  <StyledRadio {...props} ref={forwardedRef}>
    {indicator && (
      <StyledRadioButton>
        <StyledRadioIndicator />
      </StyledRadioButton>
    )}
    {props.children}
  </StyledRadio>
))
