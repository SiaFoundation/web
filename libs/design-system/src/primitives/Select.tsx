import React from 'react'
import { styled, CSS } from '../config/theme'
import { CaretSortIcon } from '@radix-ui/react-icons'

const SelectWrapper = styled('div', {
  backgroundColor: '$loContrast',
  borderRadius: '$2',
  boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  color: '$hiContrast',
  fontFamily: '$sans',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 400,
  height: '$5',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',

  '&:focus-within': {
    zIndex: 1,
    boxShadow:
      'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
  },
  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '1',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        px: '$3',
        fontSize: '$3',
        lineHeight: '1',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$4',
        lineHeight: '1',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})

const StyledSelect = styled('select', {
  appearance: 'none',
  flex: 1,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'inherit',
  color: 'inherit',
  font: 'inherit',
  outline: 'none',
  width: '100%',
  height: '100%',
  pl: '$1',
  pr: '$3',
  lineHeight: '25px',
})

const StyledCaretSortIcon = styled(CaretSortIcon, {
  pointerEvents: 'none',
})

type SelectProps = Omit<React.ComponentProps<typeof StyledSelect>, 'size'> &
  React.ComponentProps<typeof SelectWrapper> & { css?: CSS }

export const Select = React.forwardRef<
  React.ElementRef<typeof StyledSelect>,
  SelectProps
>(({ css, size, ...props }, forwardedRef) => (
  <SelectWrapper size={size} css={css}>
    <StyledSelect ref={forwardedRef} {...props} />
    <StyledCaretSortIcon />
  </SelectWrapper>
))

Select.toString = () => `.${SelectWrapper.className}`
