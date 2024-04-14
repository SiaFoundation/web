import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Text,
  secondsInMilliseconds,
  truncate,
  copyToClipboard,
} from '@siafoundation/design-system'
import {
  DataView16,
  ListChecked16,
  Filter16,
  Copy16,
  ResetAlt16,
  CaretDown16,
} from '@siafoundation/react-icons'
import {
  useHostResetLostSectorCount,
  useHostsAllowlist,
  useHostsBlocklist,
  useRhpScan,
} from '@siafoundation/renterd-react'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { useContracts } from '../../contexts/contracts'
import { useHosts } from '../../contexts/hosts'
import { useAllowlistUpdate } from '../../hooks/useAllowlistUpdate'
import { useBlocklistUpdate } from '../../hooks/useBlocklistUpdate'
import { addressContainsFilter } from '../Contracts/ContractsFilterAddressDialog'
import { publicKeyContainsFilter } from '../Contracts/ContractsFilterPublicKeyDialog'
import { filterPublicKeyEquals } from './HostsFilterPublicKeyDialog'

type Props = {
  address: string
  publicKey: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
  trigger?: React.ReactNode
}

export function HostContextMenu({
  address,
  publicKey,
  contentProps,
  buttonProps,
  trigger,
}: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button variant="ghost" icon="hover" {...buttonProps}>
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
      <HostContextMenuContent address={address} publicKey={publicKey} />
    </DropdownMenu>
  )
}

export function HostContextMenuContent({
  address,
  publicKey,
}: {
  address?: string
  publicKey: string
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
  const rescan = useRhpScan()
  const resetLostSectors = useHostResetLostSectorCount()
  return (
    <>
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Host {publicKey.slice(0, 24)}...
        </Text>
      </div>
      <DropdownMenuLabel>Filters</DropdownMenuLabel>
      <DropdownMenuItem
        disabled={!address}
        onSelect={() => {
          resetHostsFilters()
          setHostsFilter({
            id: 'addressContains',
            value: address,
            label: `Address contains ${truncate(address, 20)}`,
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
          resetHostsFilters()
          setHostsFilter(filterPublicKeyEquals(publicKey))
          router.push(routes.hosts.index)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter hosts by public key
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!address}
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
      <DropdownMenuItem
        disabled={!address}
        onSelect={() => {
          rescan.post({
            payload: {
              hostKey: publicKey,
              hostIP: address,
              timeout: secondsInMilliseconds(30),
            },
          })
        }}
      >
        <DropdownMenuLeftSlot>
          <DataView16 />
        </DropdownMenuLeftSlot>
        Rescan host
      </DropdownMenuItem>
      {address && blocklist.data?.find((l) => l === address) ? (
        <DropdownMenuItem
          disabled={!address}
          onSelect={() => blocklistUpdate([], [address])}
        >
          <DropdownMenuLeftSlot>
            <ListChecked16 />
          </DropdownMenuLeftSlot>
          Remove address from blocklist
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          disabled={!address}
          onSelect={() => blocklistUpdate([address], [])}
        >
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
      <DropdownMenuItem
        onSelect={() =>
          resetLostSectors.post({
            params: {
              publicKey,
            },
          })
        }
      >
        <DropdownMenuLeftSlot>
          <ResetAlt16 />
        </DropdownMenuLeftSlot>
        Reset lost sector count
      </DropdownMenuItem>
      <DropdownMenuLabel>Copy</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => copyToClipboard(publicKey, 'host public key')}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Host public key
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!address}
        onSelect={() => {
          copyToClipboard(address, 'host address')
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
