import { MultiSelect } from '@siafoundation/design-system'

export type KeyData = {
  id: string
  key: string
  secret: string
}

export type CellContext = {
  multiSelect: MultiSelect<KeyData>
}

export type TableColumnId = 'selection' | 'actions' | 'key' | 'secret'

export const columnsDefaultVisible: TableColumnId[] = ['key', 'secret']

export type SortField = 'key' | 'secret'

export const defaultSortField: SortField = 'key'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'key',
    label: 'key',
    category: 'general',
  },
  {
    id: 'secret',
    label: 'secret',
    category: 'general',
  },
]
