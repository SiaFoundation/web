export type WalletType = 'seed' | 'watch' | 'ledger'

export type WalletData = {
  id: string
  name: string
  description: string
  type: WalletType
  seedHash?: string
}

export type TableColumnId = 'actions' | 'id' | 'details' | 'type'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'id',
  'details',
  'type',
]

export type SortField = 'name' | 'type'

export const defaultSortField: SortField = 'name'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'name',
    label: 'name',
    category: 'general',
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
  },
]
