import React from 'react'
import {
  DropdownMenu,
  Button,
  DropdownMenuItem,
  webLinks,
  Link,
  DropdownMenuGroup,
  DropdownMenuLabel,
  CurrencyFiatSelector,
  ThemeRadio,
} from '@siafoundation/design-system'
import { Menu24 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'

type Props = React.ComponentProps<typeof Button> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function NavDropdownMenu({ trigger, children, ...props }: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button variant="ghost" size="medium" {...props}>
            <Menu24 />
          </Button>
        )
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuGroup className="py-1 px-1">
        <DropdownMenuLabel className="px-1">Settings</DropdownMenuLabel>
        <div className="py-2 px-2.5">
          <ThemeRadio />
        </div>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
