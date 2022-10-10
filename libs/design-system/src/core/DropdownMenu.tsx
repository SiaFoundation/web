import React from 'react'
import { styled, CSS } from '../config/theme'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { menuCss, separatorCss, itemCss, labelCss } from './Menu'
import { Box } from './Box'
import { Flex } from './Flex'
import { panelStyles } from './Panel'
import { CheckmarkOutline16 } from '../icons'
import { scaleIn } from '../config/animations'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const dropdownMenuContentCss: CSS = {
  boxShadow: '$colors$shadowPopup, $colors$border',
  color: '$hiContrast',
  '@hover': {
    '&:hover': {
      boxShadow: '$colors$shadowPopupFocus, $colors$border',
    },
  },
  minWidth: 180,
  padding: 5,
  willChange: 'transform, opacity',
  '@media (prefers-reduced-motion: no-preference)': {
    transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
    animation: `${scaleIn} 0.05s ease-out`,
  },
  position: 'relative',
  '&[data-side="top"]': { bottom: '$1' },
  '&[data-side="bottom"]': { top: '$1' },
  '&[data-side="left"]': { right: '$1' },
  '&[data-side="right"]': { left: '$1' },
}

const StyledDropdownMenuContent = styled(
  DropdownMenuPrimitive.Content,
  menuCss,
  panelStyles,
  dropdownMenuContentCss
)

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof StyledDropdownMenuContent>,
  React.ComponentProps<typeof StyledDropdownMenuContent>
>((props, forwardedRef) => (
  <DropdownMenuPrimitive.Portal>
    <StyledDropdownMenuContent {...props} ref={forwardedRef} />
  </DropdownMenuPrimitive.Portal>
))

export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuSubContent = styled(
  DropdownMenuPrimitive.SubContent,
  menuCss,
  panelStyles,
  dropdownMenuContentCss
)
export const DropdownMenuSubTrigger = styled(
  DropdownMenuPrimitive.SubTrigger,
  itemCss
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
    {children}
    <DropdownMenuRightSlot>
      <DropdownMenuPrimitive.ItemIndicator>
        <Flex
          css={{
            width: '$2',
            height: '$2',
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
    </DropdownMenuRightSlot>
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
    {children}
    <DropdownMenuRightSlot>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckmarkOutline16 />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuRightSlot>
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
})
