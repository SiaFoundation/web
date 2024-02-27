export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

export type AlertData = {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
  data: Record<string, unknown>
  dismiss: () => void
}

export type TableColumnId = 'actions' | 'overview' | 'data' | 'time'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'overview',
  'data',
  'time',
]

export type SortField = ''

export const defaultSortField: SortField = ''

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = []
