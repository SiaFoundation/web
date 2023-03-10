import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Draggable16,
  ListChecked16,
  DropdownMenuLeftSlot,
  Filter16,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { useHostsAllowlist, useHostsBlocklist } from '@siafoundation/react-core'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'

type Props = {
  address: string
  publicKey: string
}

export function HostDropdownMenu({ address, publicKey }: Props) {
  const blocklist = useHostsBlocklist()
  const allowlist = useHostsAllowlist()
  const blocklistUpdate = useBlocklistUpdate()
  const allowlistUpdate = useAllowlistUpdate()
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost">
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Filters</DropdownMenuLabel>
      <DropdownMenuItem>
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter hosts by address
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter contracts by address
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter contracts by public key
      </DropdownMenuItem>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {blocklist.data?.find((l) => l === address) ? (
        <DropdownMenuItem onSelect={() => blocklistUpdate([], [address])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove address from blocklist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onSelect={() => blocklistUpdate([address], [])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Add address to blocklist
        </DropdownMenuItem>
      )}
      {allowlist.data?.find((l) => l === publicKey) ? (
        <DropdownMenuItem onSelect={() => allowlistUpdate([], [publicKey])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove public key from allowlist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onSelect={() => allowlistUpdate([publicKey], [])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Add public key to allowlist
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  )
}
