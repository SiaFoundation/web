import React, { ReactText } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { styled, CSS, keyframes } from '../config/theme'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { menuCss, separatorCss, itemCss, labelCss } from './Menu'
import { Box } from './Box'
import { Flex } from './Flex'
import { panelStyles } from './Panel'

const scaleIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.7)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = styled(
  DropdownMenuPrimitive.Content,
  menuCss,
  panelStyles,
  {
    minWidth: 180,
    // backgroundColor: 'white',
    // borderRadius: 6,
    padding: 5,
    boxShadow:
      '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
    '@media (prefers-reduced-motion: no-preference)': {
      transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
      animation: `${scaleIn} 0.1s ease-out`,
    },
  }
)

export const DropdownMenuSeparator = styled(
  DropdownMenuPrimitive.Separator,
  separatorCss
)
export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, itemCss)

const StyledDropdownMenuRadioItem = styled(
  DropdownMenuPrimitive.RadioItem,
  itemCss
)

type DialogMenuRadioItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>
type DialogMenuRadioItemProps = DialogMenuRadioItemPrimitiveProps & {
  css?: CSS
}

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuRadioItem>,
  DialogMenuRadioItemProps
>(({ children, ...props }, forwardedRef) => (
  <StyledDropdownMenuRadioItem {...props} ref={forwardedRef}>
    <Box as="span" css={{ position: 'absolute', left: '$1' }}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Flex
          css={{
            width: '$3',
            height: '$3',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            css={{
              width: '$1',
              height: '$1',
              backgroundColor: 'currentColor',
              borderRadius: '$round',
            }}
          />
        </Flex>
      </DropdownMenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledDropdownMenuRadioItem>
))

const StyledDropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
  itemCss
)

type DialogMenuCheckboxItemPrimitiveProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>
type DialogMenuCheckboxItemProps = DialogMenuCheckboxItemPrimitiveProps & {
  css?: CSS
}

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuCheckboxItem>,
  DialogMenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => (
  <StyledDropdownMenuCheckboxItem {...props} ref={forwardedRef}>
    <Box as="span" css={{ position: 'absolute', left: '$1' }}>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledDropdownMenuCheckboxItem>
))

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label, labelCss)
export const DropdownMenuRadioGroup = styled(
  DropdownMenuPrimitive.RadioGroup,
  {}
)
export const DropdownMenuGroup = styled(DropdownMenuPrimitive.Group, {})

export const DropdownMenuRightSlot = styled('div', {
  marginLeft: 'auto',
  paddingLeft: 20,
  color: '$slate8',
  ':focus > &': { color: '$slate10' },
  '[data-disabled] &': { color: '$slate6' },
})
