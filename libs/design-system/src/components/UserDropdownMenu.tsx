import React from 'react'
import { DropdownMenu, DropdownMenuSeparator } from '../core/DropdownMenu'
import { OverflowMenuHorizontal20 } from '../icons/carbon'
import { ThemeMenu } from './ThemeMenu'
import { Button } from '../core/Button'

type Props = React.ComponentProps<typeof Button> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function UserDropdownMenu({ trigger, children, ...props }: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button size="small" {...props} className="scale-150">
            <OverflowMenuHorizontal20 />
          </Button>
        )
      }
      contentProps={{ align: 'end' }}
    >
      {children}
      {children && <DropdownMenuSeparator />}
      <ThemeMenu />
    </DropdownMenu>
  )
}
