import { Peer } from '@libp2p/interface'

export type PeerData = {
  id: string
  peer: Peer
  isConnected: boolean
}

export type TableColumnId =
  | 'actions'
  | 'type'
  | 'name'
  | 'connection'
  | 'addresses'

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'connection',
  'addresses',
]

export type SortField = 'name' | 'connection'

export const defaultSortField: SortField = 'name'

export const sortOptions: { id: SortField; label: string; category: string }[] =
  [
    {
      id: 'name',
      label: 'name',
      category: 'general',
    },
    {
      id: 'connection',
      label: 'connection',
      category: 'general',
    },
  ]
