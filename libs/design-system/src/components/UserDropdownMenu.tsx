'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../core/DropdownMenu'
import { OverflowMenuHorizontal24 } from '@siafoundation/react-icons'
import { Button } from '../core/Button'
import { ThemeRadio } from './ThemeRadio'

type Props = React.ComponentProps<typeof Button> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function UserDropdownMenu({ trigger, children, ...props }: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button size="medium" {...props}>
            <OverflowMenuHorizontal24 />
          </Button>
        )
      }
      contentProps={{ align: 'end' }}
    >
      {children}
      {children && <DropdownMenuSeparator />}
      <DropdownMenuGroup>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <div className="pt-1 pb-3 px-2">
          <ThemeRadio className="justify-between" />
        </div>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
