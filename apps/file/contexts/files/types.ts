import { FullPath } from './paths'

export type ObjectType = 'directory' | 'file'

export type ObjectData = {
  id: FullPath
  // path is exacty bucket + returned key
  // eg: default + /path/to/file.txt = default/path/to/file.txt
  path: FullPath
  cid: string
  name: string
  size: number
  type: ObjectType
  fileType: string
  isUploading?: boolean
  loaded?: number
}

export type TableColumnId =
  | 'actions'
  | 'type'
  | 'name'
  | 'cid'
  | 'size'
  | 'local'
  | 'remotes'

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'cid',
  'size',
  'local',
  'remotes',
]

export type SortField = 'name'

export const defaultSortField: SortField = 'name'

export const sortOptions: { id: SortField; label: string; category: string }[] =
  [
    {
      id: 'name',
      label: 'name',
      category: 'general',
    },
  ]
