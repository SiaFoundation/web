import React from 'react'
import {
  DropdownMenu,
  Button,
  DropdownMenuItem,
  webLinks,
  Link,
  DropdownMenuGroup,
  DropdownMenuLabel,
  Menu24,
} from '@siafoundation/design-system'

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
      <DropdownMenuGroup className="py-1 px-1 w-[120px]">
        <DropdownMenuLabel className="px-1">Network</DropdownMenuLabel>
        <DropdownMenuItem className="p-2">
          <Link href={webLinks.explore.mainnet} underline="none">
            Sia Mainnet
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2">
          <Link href={webLinks.explore.testnet} underline="none">
            Zen Testnet
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup className="py-1 px-1 w-[120px]">
        <DropdownMenuLabel className="px-1">Tools</DropdownMenuLabel>
        <DropdownMenuItem className="p-2">
          <Link href={webLinks.explore.testnetFaucet} underline="none">
            Zen Faucet
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
