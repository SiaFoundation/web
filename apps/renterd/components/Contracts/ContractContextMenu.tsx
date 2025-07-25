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
  CaretDown16,
  ListChecked16,
  Filter16,
  Copy16,
  Delete16,
} from '@siafoundation/react-icons'
import {
  useHost,
  useHostsAllowlist,
  useHostsBlocklist,
} from '@siafoundation/renterd-react'
import { routes } from '../../config/routes'
import { useRouter } from 'next/navigation'
import { useContracts } from '../../contexts/contracts'
import { useHosts } from '../../contexts/hosts'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'
import { publicKeyContainsFilter } from './ContractsFilterPublicKeyDialog'
import { useContractConfirmDelete } from './useContractConfirmDelete'
import { getHostAddress } from '../../lib/host'

type Props = {
  id: string
  trigger?: React.ReactNode
  hostKey: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ContractContextMenu({
  id,
  trigger,
  hostKey,
  contentProps,
  buttonProps,
}: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button
            aria-label="contract context menu"
            icon="hover"
            size="none"
            {...buttonProps}
          >
            <CaretDown16 />
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
      <ContractContextMenuContent id={id} hostKey={hostKey} />
    </DropdownMenu>
  )
}

export function ContractContextMenuContent({
  id,
  hostKey,
}: {
  id: string
  hostKey?: string
}) {
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
  const host = useHost({
    disabled: !hostKey,
    params: {
      hostkey: hostKey || '',
    },
  })
  const hostAddress = getHostAddress(host.data)
  return (
    <>
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Contract {id.slice(0, 24)}...
        </Text>
      </div>
      <DropdownMenuLabel>Filters</DropdownMenuLabel>
      <DropdownMenuItem
        disabled={!hostAddress}
        onSelect={() => {
          resetHostsFilters()
          setHostsFilter({
            id: 'addressContains',
            value: hostAddress,
            label: `Address contains ${hostAddress}`,
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
        disabled={!hostKey}
        onSelect={() => {
          if (!hostKey) {
            return
          }
          resetContractsFilters()
          setContractsFilter(publicKeyContainsFilter(hostKey))
          router.push(routes.contracts.index)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter contracts by host public key
      </DropdownMenuItem>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {blocklist.data?.find((l) => l === hostAddress) ? (
        <DropdownMenuItem
          disabled={!hostAddress}
          onSelect={() => {
            if (!hostAddress) {
              return
            }
            blocklistUpdate([], [hostAddress])
          }}
        >
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove host address from blocklist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          disabled={!hostAddress}
          onSelect={() => {
            if (!hostAddress) {
              return
            }
            blocklistUpdate([hostAddress], [])
          }}
        >
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Add host address to blocklist
        </DropdownMenuItem>
      )}
      {allowlist.data?.find((l) => l === hostKey) ? (
        <DropdownMenuItem
          disabled={!hostKey}
          onSelect={() => {
            if (!hostKey) {
              return
            }
            allowlistUpdate([], [hostKey])
          }}
        >
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove host public key from allowlist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          disabled={!hostKey}
          onSelect={() => {
            if (!hostKey) {
              return
            }
            allowlistUpdate([hostKey], [])
          }}
        >
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
        disabled={!hostKey}
        onSelect={() => {
          if (!hostKey) {
            return
          }
          copyToClipboard(hostKey, 'host public key')
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Host public key
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!hostAddress}
        onSelect={() => {
          if (!hostAddress) {
            return
          }
          copyToClipboard(hostAddress, 'host address')
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Host address
      </DropdownMenuItem>
    </>
  )
}
