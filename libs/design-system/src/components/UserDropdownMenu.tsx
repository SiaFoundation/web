import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../core/DropdownMenu'
import { OverflowMenuHorizontal20 } from '../icons'
import { ThemeMenu } from './ThemeMenu'
import { IconButton } from '../core/IconButton'

type Props = React.ComponentProps<typeof IconButton> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function UserDropdownMenu({ trigger, children, ...props }: Props) {
  const triggerEl = trigger || (
    <IconButton size="1" {...props} css={{ transform: 'scale(1.5)' }}>
      <OverflowMenuHorizontal20 />
    </IconButton>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerEl}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {children}
        {children && <DropdownMenuSeparator />}
        <ThemeMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
