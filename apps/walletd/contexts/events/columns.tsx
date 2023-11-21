import {
  Text,
  TableColumn,
  ValueCopyable,
  LoadingDots,
  ValueScFiat,
  ValueSf,
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
  // {
  //   id: 'id',
  //   label: 'ID',
  //   category: 'general',
  //   fixed: true,
  //   render: ({ data: { id } }) => {
  //     return (
  //       <ValueCopyable size="12" maxLength={20} value={id} type="transaction" />
  //     )
  //   },
  // },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    fixed: true,
    render: ({ data: { type } }) => {
      return (
        <Text weight="medium" ellipsis>
          {type}
        </Text>
      )
    },
  },
  {
    id: 'height',
    label: 'height',
    category: 'general',
    render: ({ data: { height, pending } }) => {
      if (pending) {
        return (
          <Text size="12" ellipsis>
            <LoadingDots />
          </Text>
        )
      }
      if (!height) {
        return null
      }
      return (
        <Text size="12" ellipsis>
          {height.toLocaleString()}
        </Text>
      )
    },
  },
  {
    id: 'maturityHeight',
    label: 'maturity height',
    category: 'general',
    render: ({ data: { maturityHeight } }) => {
      if (!maturityHeight) {
        return null
      }
      return (
        <Text size="12" ellipsis>
          {maturityHeight.toLocaleString()}
        </Text>
      )
    },
  },
  {
    id: 'timestamp',
    label: 'timestamp',
    category: 'general',
    render: ({ data: { timestamp, pending } }) => {
      if (pending) {
        return (
          <Text size="12" ellipsis>
            <LoadingDots />
          </Text>
        )
      }
      return (
        <Text size="12" ellipsis>
          {humanDate(timestamp, { timeStyle: 'short' })}
        </Text>
      )
    },
  },
  {
    id: 'amount',
    label: 'amount',
    category: 'general',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { amountSc, amountSf } }) => {
      if (!amountSc) {
        return null
      }
      return (
        <div className="flex flex-col gap-2">
          {!amountSc.isZero() && (
            <ValueScFiat displayBoth size="12" value={amountSc} />
          )}
          {!!amountSf && <ValueSf size="12" value={amountSf} />}
        </div>
      )
    },
  },
  {
    id: 'fee',
    label: 'fee',
    category: 'general',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { fee } }) => {
      if (!fee) {
        return null
      }
      return <ValueScFiat displayBoth size="12" variant="value" value={fee} />
    },
  },
  {
    id: 'transactionId',
    label: 'transaction ID',
    category: 'general',
    render: ({ data: { transactionId } }) => {
      if (!transactionId) {
        return null
      }
      return (
        <ValueCopyable size="12" value={transactionId} label="transaction ID" />
      )
    },
  },
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
    render: ({ data: { contractId } }) => {
      if (!contractId) {
        return null
      }
      return <ValueCopyable size="12" value={contractId} label="contract ID" />
    },
  },
  {
    id: 'outputId',
    label: 'output ID',
    category: 'general',
    render: ({ data: { outputId } }) => {
      if (!outputId) {
        return null
      }
      return <ValueCopyable size="12" value={outputId} label="output ID" />
    },
  },
  {
    id: 'netAddress',
    label: 'net address',
    category: 'general',
    render: ({ data: { netAddress } }) => {
      if (!netAddress) {
        return null
      }
      return <ValueCopyable size="12" value={netAddress} type="ip" />
    },
  },
  {
    id: 'publicKey',
    label: 'public key',
    category: 'general',
    render: ({ data: { publicKey } }) => {
      if (!publicKey) {
        return null
      }
      return <ValueCopyable size="12" value={publicKey} label="public key" />
    },
  },
]
