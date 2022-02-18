import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@siafoundation/design-system'
import { ThemeMenu } from './ThemeMenu'
import React from 'react'
import { IconButton } from './IconButton'

type Props = React.ComponentProps<typeof IconButton> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function UserContextMenu({ trigger, children, ...props }: Props) {
  const triggerEl = trigger || (
    <IconButton size="1" {...props} css={{ transform: 'scale(1.5)' }}>
      <HamburgerMenuIcon />
    </IconButton>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerEl}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children}
        <ThemeMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
