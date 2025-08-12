import {
  Text,
  TableColumn,
  ValueCopyable,
  LoadingDots,
  ValueCurrency,
  ValueSf,
  Tooltip,
  Badge,
} from '@siafoundation/design-system'
import { humanDate, getTxTypeLabel } from '@siafoundation/units'
import { CellContext, EventData, TableColumnId } from './types'
import { Locked16, Unlocked16 } from '@siafoundation/react-icons'

type EventsTableColumn = TableColumn<TableColumnId, EventData, CellContext> & {
  fixed?: boolean
  category?: string
}

export const columns: EventsTableColumn[] = [
  {
    id: 'transactionId',
    label: 'transaction ID',
    category: 'general',
    render: ({ data: { id }, context }) => {
      if (!id) {
        return null
      }
      return (
        <ValueCopyable
          size="12"
          value={id}
          label="transaction ID"
          type="transaction"
          siascanUrl={context.siascanUrl}
        />
      )
    },
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    fixed: true,
    render: ({ data: { txType } }) => {
      return <Badge size="small">{getTxTypeLabel(txType)}</Badge>
    },
  },
  {
    id: 'height',
    label: 'height',
    category: 'general',
    contentClassName: 'justify-end',
    render: ({ data: { height, pending, maturityHeight, isMature } }) => {
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
      if (height && maturityHeight && maturityHeight > height) {
        return (
          <Tooltip
            content={
              isMature
                ? 'The maturity height has been reached.'
                : 'The maturity height has not been reached, therefore the output is still locked.'
            }
          >
            <div className="flex flex-col gap-[5px]">
              <div className="flex justify-end">
                <Text
                  size="12"
                  font="mono"
                  ellipsis
                  color={isMature ? 'green' : 'red'}
                  className="flex gap-1 items-center"
                >
                  {isMature ? <Unlocked16 /> : <Locked16 />}
                  {maturityHeight.toLocaleString()}
                </Text>
              </div>
              <div className="flex justify-between items-end gap-1">
                <div className="pl-[8px] pb-[6px]">
                  <div className="border-l border-b border-gray-800 dark:border-graydark-800 h-[20px] w-[7px]" />
                </div>
                <Text size="12" font="mono" color="subtle" ellipsis>
                  {height.toLocaleString()}
                </Text>
              </div>
            </div>
          </Tooltip>
        )
      }
      return (
        <Text size="12" font="mono" ellipsis>
          {height.toLocaleString()}
        </Text>
      )
    },
  },
  {
    id: 'timestamp',
    label: 'timestamp',
    category: 'general',
    contentClassName: 'justify-end',
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
        <div className="flex flex-col gap-2 items-end">
          {!amountSc.isZero() && (
            <ValueCurrency displayBoth size="12" value={amountSc} />
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
      return <ValueCurrency displayBoth size="12" variant="value" value={fee} />
    },
  },
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
    render: ({ data: { contractId }, context }) => {
      if (!contractId) {
        return null
      }
      return (
        <ValueCopyable
          size="12"
          value={contractId}
          label="contract ID"
          siascanUrl={context.siascanUrl}
        />
      )
    },
  },
]
