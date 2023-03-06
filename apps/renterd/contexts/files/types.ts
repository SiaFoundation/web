export type ObjectData = {
  id: string
  path: string
  name: string
  isDirectory?: boolean
  isUploading?: boolean
  loaded?: number
  total?: number
}

export type TableColumnId = 'type' | 'name' | 'size' | 'slabs' | 'actions'

export const columnsMeta: Record<
  TableColumnId,
  { id: TableColumnId; label: string; sortable?: string; fixed?: boolean }
> = {
  type: {
    id: 'type',
    label: '',
    fixed: true,
  },
  name: {
    id: 'name',
    label: 'Name',
    sortable: 'Order by',
  },
  size: {
    id: 'size',
    label: 'Size',
    // sortable: 'Order by',
  },
  slabs: {
    id: 'slabs',
    label: 'Slabs',
    // sortable: 'Order by',
  },
  actions: {
    id: 'actions',
    label: '',
    fixed: true,
  },
}

export const columnsDefaultVisible: TableColumnId[] = ['type', 'name', 'size']

export const columnsDefaultSort = 'type'
