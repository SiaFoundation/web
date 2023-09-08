import React from 'react'
import {
  DropdownMenu,
  Button,
  DropdownMenuItem,
  webLinks,
  Link,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { networkName } from '../../config'

type Props = React.ComponentProps<typeof Button> & {
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function NavDropdownMenu({ trigger, children, ...props }: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button size="medium" {...props}>
            {networkName}
          </Button>
        )
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuGroup className="py-1 px-1 w-[120px]">
        <DropdownMenuLabel className="px-1">Network</DropdownMenuLabel>
        <DropdownMenuItem className="p-2">
          <Link href={webLinks.explore.mainnet} underline="hover">
            Sia Mainnet
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2">
          <Link href={webLinks.explore.testnet} underline="hover">
            Zen Testnet
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
