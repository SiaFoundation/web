import React from 'react'
import { styled, CSS } from '../config/theme'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

export const RadioCardGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',
  gap: '$4',
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
})

type RadioGroupItemPrimitiveProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
>
type RadioCardProps = RadioGroupItemPrimitiveProps & { css?: CSS }

export const RadioCard = React.forwardRef<
  React.ElementRef<typeof StyledRadio>,
  RadioCardProps
>((props, forwardedRef) => (
  <StyledRadio {...props} ref={forwardedRef}>
    {props.children}
  </StyledRadio>
))
