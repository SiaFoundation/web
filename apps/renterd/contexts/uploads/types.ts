import { TableColumn } from '@siafoundation/design-system'
import { ObjectUploadData } from '../filesManager/types'

export type TableColumnId = 'actions' | 'path' | 'status' | 'size' | 'createdAt'

export type UploadsTableColumn = TableColumn<
  TableColumnId,
  ObjectUploadData,
  never
> & {
  fixed?: boolean
  category?: string
}

export const columnsDefaultVisible: TableColumnId[] = [
  'path',
  'status',
  'size',
  'createdAt',
]

export type SortField = 'path'

export const defaultSortField: SortField = 'path'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = []
