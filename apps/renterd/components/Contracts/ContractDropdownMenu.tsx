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
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useContracts } from '../../contexts/contracts'
import { useHosts } from '../../contexts/hosts'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'
import { addressContainsFilter } from '../Contracts/ContractsFilterAddressDialog'
import { publicKeyContainsFilter } from '../Contracts/ContractsFilterPublicKeyDialog'

type Props = {
  address: string
  publicKey: string
}

export function ContractDropdownMenu({ address, publicKey }: Props) {
  const router = useRouter()
  const { setFilter: setHostsFilter, resetFilters: resetHostsFilters } =
    useHosts()
  const { setFilter: setContractsFilter, resetFilters: resetContractsFilters } =
    useContracts()
  const blocklist = useHostsBlocklist()
  const allowlist = useHostsAllowlist()
  const blocklistUpdate = useBlocklistUpdate()
  const allowlistUpdate = useAllowlistUpdate()
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Contract filters</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          resetHostsFilters()
          setHostsFilter({
            id: 'addressContains',
            value: address,
            label: `Address contains ${address}`,
          })
          router.push(routes.hosts.index)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter hosts by address
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          resetContractsFilters()
          setContractsFilter(addressContainsFilter(address))
          router.push(routes.contracts.index)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter contracts by address
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          resetContractsFilters()
          setContractsFilter(publicKeyContainsFilter(publicKey))
          router.push(routes.contracts.index)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter contracts by public key
      </DropdownMenuItem>
      <DropdownMenuLabel>Contract actions</DropdownMenuLabel>
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
