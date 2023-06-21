import {
  Text,
  TableColumn,
  ValueCopyable,
  ValueSc,
  Badge,
  LoadingDots,
} from '@siafoundation/design-system'
import { humanDate } from '@siafoundation/sia-js'
import { EventData, TableColumnId } from './types'

type EventsTableColumn = TableColumn<TableColumnId, EventData, never> & {
  fixed?: boolean
  category?: string
}

export const columns: EventsTableColumn[] = [
  // {
  //   id: 'actions',
  //   label: '',
  //   fixed: true,
  //   cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
  //   render: ({ data: { name } }) => null,
  // },
  {
    id: 'id',
    label: 'ID',
    category: 'general',
    fixed: true,
    render: ({ data: { id } }) => {
      return <ValueCopyable maxLength={20} value={id} type="transaction" />
    },
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    render: ({ data: { type } }) => {
      return <Badge>{type}</Badge>
    },
  },
  {
    id: 'timestamp',
    label: 'timestamp',
    category: 'general',
    render: ({ data: { timestamp, pending } }) => {
      if (pending) {
        return (
          <Text>
            <LoadingDots />
          </Text>
        )
      }
      return <Text>{humanDate(timestamp, { timeStyle: 'short' })}</Text>
    },
  },
  {
    id: 'amount',
    label: 'amount',
    category: 'general',
    render: ({ data: { amount } }) => {
      return (
        <div className="flex flex-col gap-2">
          <ValueSc value={amount} />
        </div>
      )
    },
  },
]
