import {
  AlertSeverity,
  AlertData as AlertDataField,
} from '@siafoundation/renterd-types'

export type AlertData = {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
  data: AlertDataField
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
