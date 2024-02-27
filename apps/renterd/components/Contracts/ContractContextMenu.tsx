import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Text,
  copyToClipboard,
} from '@siafoundation/design-system'
import {
  Draggable16,
  ListChecked16,
  Filter16,
  Copy16,
  Delete16,
} from '@siafoundation/react-icons'
import {
  useHostsAllowlist,
  useHostsBlocklist,
} from '@siafoundation/react-renterd'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useContracts } from '../../contexts/contracts'
import { useHosts } from '../../contexts/hosts'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'
import { addressContainsFilter } from './ContractsFilterAddressDialog'
import { publicKeyContainsFilter } from './ContractsFilterPublicKeyDialog'
import { useContractConfirmDelete } from './useContractConfirmDelete'

type Props = {
  id: string
  trigger?: React.ReactNode
  address: string
  publicKey: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ContractContextMenu({
  id,
  trigger,
  address,
  publicKey,
  contentProps,
  buttonProps,
}: Props) {
  const router = useRouter()
  const { setFilter: setHostsFilter, resetFilters: resetHostsFilters } =
    useHosts()
  const { setFilter: setContractsFilter, resetFilters: resetContractsFilters } =
    useContracts()
  const blocklist = useHostsBlocklist()
  const allowlist = useHostsAllowlist()
  const blocklistUpdate = useBlocklistUpdate()
  const allowlistUpdate = useAllowlistUpdate()
  const contractConfirmDelete = useContractConfirmDelete()
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button variant="ghost" icon="hover" {...buttonProps}>
            <Draggable16 />
          </Button>
        )
      }
      contentProps={{
        align: 'start',
        ...contentProps,
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Contract {publicKey.slice(0, 24)}...
        </Text>
      </div>
      <DropdownMenuLabel>Filters</DropdownMenuLabel>
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
        Filter hosts by host address
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
        Filter contracts by host address
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
        Filter contracts by host public key
      </DropdownMenuItem>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {blocklist.data?.find((l) => l === address) ? (
        <DropdownMenuItem onSelect={() => blocklistUpdate([], [address])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove host address from blocklist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onSelect={() => blocklistUpdate([address], [])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Add host address to blocklist
        </DropdownMenuItem>
      )}
      {allowlist.data?.find((l) => l === publicKey) ? (
        <DropdownMenuItem onSelect={() => allowlistUpdate([], [publicKey])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove host public key from allowlist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onSelect={() => allowlistUpdate([publicKey], [])}>
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Add host public key to allowlist
        </DropdownMenuItem>
      )}
      <DropdownMenuItem onSelect={() => contractConfirmDelete(id)}>
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete contract
      </DropdownMenuItem>
      <DropdownMenuLabel>Copy</DropdownMenuLabel>
      <DropdownMenuItem onSelect={() => copyToClipboard(id, 'contract ID')}>
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Contract ID
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => copyToClipboard(publicKey, 'host public key')}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Host public key
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => copyToClipboard(address, 'host address')}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Host address
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
