import { Badge, Text, Tooltip } from '@siafoundation/design-system'
import { humanDate } from '@siafoundation/units'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'

export type TransactionHeaderData = {
  id: string
  blockHeight: number
  confirmations: number
  timestamp: string
}

type Props = {
  title?: string
  transactionHeaderData: TransactionHeaderData
}

export function TransactionHeader({ title, transactionHeaderData }: Props) {
  const { id, timestamp, blockHeight, confirmations } = transactionHeaderData
  return (
    <div className="flex flex-wrap gap-y-4 items-center justify-between">
      <EntityHeading
        label={title || 'Transaction'}
        type="transaction"
        value={id}
        href={routes.transaction.view.replace(':id', id)}
      />
      <div className="flex gap-4 items-center overflow-hidden">
        {!!timestamp && (
          <Tooltip content={timestamp}>
            <Text font="mono" color="subtle" ellipsis>
              {humanDate(timestamp, {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </Text>
          </Tooltip>
        )}
        {!!blockHeight && (
          <Badge variant="accent">
            <div className="flex gap-2">
              <Tooltip content="Block height">
                <div className="">{blockHeight.toLocaleString()}</div>
              </Tooltip>
              <div className="">|</div>
              <div className="">
                {confirmations >= 72 ? '72+' : confirmations} confirmations
              </div>
            </div>
          </Badge>
        )}
      </div>
    </div>
  )
}
