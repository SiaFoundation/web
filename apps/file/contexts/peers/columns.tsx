'use client'

import {
  Badge,
  Code,
  HoverCard,
  TableColumn,
  Text,
  ValueCopyable,
  copyToClipboard,
} from '@siafoundation/design-system'
import { PeerData, TableColumnId } from './types'

type Context = {
  currentHeight: number
  contractsTimeRange: {
    startHeight: number
    endHeight: number
  }
}

type PeersTableColumn = TableColumn<TableColumnId, PeerData, Context> & {
  fixed?: boolean
  category?: string
}

export const columns: PeersTableColumn[] = [
  {
    id: 'type',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-2 [&+*]:!pl-0',
    render: function TypeColumn() {
      return null
    },
  },
  {
    id: 'name',
    label: 'name',
    category: 'general',
    contentClassName: 'max-w-[600px]',
    render: function NameColumn({ data: { id } }) {
      return <ValueCopyable value={id} />
    },
  },
  {
    id: 'connection',
    label: 'status',
    category: 'general',
    contentClassName: 'max-w-[600px]',
    render: function NameColumn({ data: { isConnected, connect } }) {
      return (
        <Badge
          onClick={!isConnected && connect}
          variant={isConnected ? 'accent' : 'inactive'}
        >
          {isConnected ? 'connected' : 'disconnected'}
        </Badge>
      )
    },
  },
  {
    id: 'addresses',
    label: 'addresses',
    category: 'general',
    render: function CidColumn({
      data: {
        peer: { addresses },
      },
    }) {
      return (
        <HoverCard
          trigger={<Badge>{addresses.length} addresses</Badge>}
          contentProps={{
            className: 'w-[300px]',
          }}
        >
          <div className="flex flex-col gap-1">
            {addresses.map((address) => (
              <Text
                key={address.multiaddr.toString()}
                size="14"
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard(address.multiaddr.toString(), 'multiaddress')
                }}
                className="cursor-pointer"
              >
                <Code className="p-1">{address.multiaddr.toString()}</Code>
              </Text>
            ))}
          </div>
        </HoverCard>
      )
    },
  },
]
