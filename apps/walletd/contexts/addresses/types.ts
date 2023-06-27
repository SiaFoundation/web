export type AddressData = {
  id: string
  address: string
  description?: string
  index?: number
}

export type TableColumnId = 'actions' | 'address' | 'index'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'address',
  'index',
]

export type SortField = 'address' | 'index'

export const defaultSortField: SortField = 'index'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'address',
    label: 'address',
    category: 'general',
  },
  {
    id: 'index',
    label: 'index',
    category: 'general',
  },
]
