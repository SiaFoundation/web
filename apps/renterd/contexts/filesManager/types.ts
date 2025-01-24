import { Bucket } from '@siafoundation/renterd-types'
import { FullPath } from '../../lib/paths'
import { MultiSelect, TableColumn } from '@siafoundation/design-system'
import { MouseEvent } from 'react'

export type ObjectType = 'bucket' | 'directory' | 'file'

export type ObjectData = {
  id: FullPath
  bucket: Bucket
  // path is exacty bucket + returned key.
  // eg: default + /path/to/file.txt = default/path/to/file.txt
  path: FullPath
  // key is the path without the bucket.
  key: string
  // name is the last segment of the path.
  name: string
  health?: number
  size: number
  type: ObjectType
  isUploading?: boolean
  isDraggable?: boolean
  isDroppable?: boolean
  loaded?: number
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void
  isSelected?: boolean
}

export type CellContext = {
  isViewingBuckets: boolean
  multiSelect: MultiSelect<ObjectData>
}

export type TableColumnId =
  | 'actions'
  | 'type'
  | 'name'
  | 'readAccess'
  | 'size'
  | 'health'

export type FilesTableColumn = TableColumn<
  TableColumnId,
  ObjectData,
  CellContext
> & {
  fixed?: boolean
  category?: string
}

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'readAccess',
  'size',
  'health',
]

export type SortField = 'name' | 'health' | 'size'

export const defaultSortField: SortField = 'name'
export const defaultSortDirection = 'asc'

export const sortOptions: {
  id: SortField
  label: string
  category: string
  clientId: keyof ObjectData
}[] = [
  {
    id: 'name',
    label: 'name',
    clientId: 'path',
    category: 'general',
  },
  {
    id: 'health',
    label: 'health',
    clientId: 'health',
    category: 'general',
  },
  {
    id: 'size',
    label: 'size',
    clientId: 'size',
    category: 'general',
  },
]

export type ExplorerMode = 'directory' | 'flat'
