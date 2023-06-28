export type WalletType = 'seed' | 'watch' | 'ledger'

export type WalletData = {
  id: string
  name?: string
  description?: string
  type?: WalletType
  seedHash?: string
  createdAt?: number
}

export type TableColumnId = 'actions' | 'id' | 'details' | 'type' | 'createdAt'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'id',
  'details',
  'type',
  'createdAt',
]

export type SortField = 'name' | 'type' | 'createdAt'

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
  {
    id: 'createdAt',
    label: 'created on',
    category: 'general',
  },
]
