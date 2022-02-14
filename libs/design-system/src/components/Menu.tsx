import React from 'react'
import * as MenuPrimitive from '@radix-ui/react-menu'
import { CheckIcon } from '@radix-ui/react-icons'
import { styled, css, CSS } from '../config/theme'
import { Box } from './Box'
import { Flex } from './Flex'
import { panelStyles } from './Panel'
import { Link } from './Link'

export const baseItemCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '$slate9',
  fontFamily: '$sans',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  cursor: 'default',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: '$6',
  padding: '0 $3',
})

export const itemCss = css(baseItemCss, {
  position: 'relative',
  fontWeight: 'bold',
  borderRadius: '$1',

  '&:focus': {
    outline: 'none',
    color: '$slate11',
  },

  '&[data-disabled]': {
    color: '$slate9',
  },

  // Make nested links and icons within links match
  [`& ${Link}, & ${Link} > *`]: {
    color: 'inherit',
    '&:hover': {
      color: 'inherit',
    },
  },
})

export const labelCss = css(baseItemCss, {
  color: '$slate8',
})

export const menuCss = css({
  boxSizing: 'border-box',
  minWidth: 120,
  py: '$1',
})

export const separatorCss = css({
  height: 1,
  my: '$1',
  backgroundColor: '$slate6',
})

export const Menu = styled(MenuPrimitive.Root, menuCss)
export const MenuContent = styled(MenuPrimitive.Content, panelStyles)

export const MenuSeparator = styled(MenuPrimitive.Separator, separatorCss)

export const MenuItem = styled(MenuPrimitive.Item, itemCss)

const StyledMenuRadioItem = styled(MenuPrimitive.RadioItem, itemCss)

type MenuRadioItemPrimitiveProps = React.ComponentProps<
  typeof MenuPrimitive.RadioItem
>
type MenuRadioItemProps = MenuRadioItemPrimitiveProps & { css?: CSS }

export const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof StyledMenuRadioItem>,
  MenuRadioItemProps
>(({ children, ...props }, forwardedRef) => (
  <StyledMenuRadioItem {...props} ref={forwardedRef}>
    <Box as="span" css={{ position: 'absolute', left: '$1' }}>
      <MenuPrimitive.ItemIndicator>
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
          ></Box>
        </Flex>
      </MenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledMenuRadioItem>
))

const StyledMenuCheckboxItem = styled(MenuPrimitive.CheckboxItem, itemCss)

type MenuCheckboxItemPrimitiveProps = React.ComponentProps<
  typeof MenuPrimitive.CheckboxItem
>
type MenuCheckboxItemProps = MenuCheckboxItemPrimitiveProps & { css?: CSS }

export const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof StyledMenuCheckboxItem>,
  MenuCheckboxItemProps
>(({ children, ...props }, forwardedRef) => (
  <StyledMenuCheckboxItem {...props} ref={forwardedRef}>
    <Box as="span" css={{ position: 'absolute', left: '$1' }}>
      <MenuPrimitive.ItemIndicator>
        <CheckIcon />
      </MenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledMenuCheckboxItem>
))

export const MenuLabel = styled(MenuPrimitive.Label, labelCss)
export const MenuRadioGroup = styled(MenuPrimitive.RadioGroup, {})
export const MenuGroup = styled(MenuPrimitive.Group, {})
