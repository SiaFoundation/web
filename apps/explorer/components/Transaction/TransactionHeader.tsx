import { Badge, Text, Tooltip } from '@siafoundation/design-system'
import { getTxTypeLabel, humanDate, TxType } from '@siafoundation/units'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import LoadingTimestamp from '../LoadingTimestamp'

export type TransactionHeaderData = {
  id: string
  blockHeight: number
  confirmations: number
  timestamp: string
  version: 'v1' | 'v2'
}

type Props = {
  title?: string
  transactionHeaderData: TransactionHeaderData
  txType?: TxType
}

export function TransactionHeader({
  title,
  transactionHeaderData,
  txType,
}: Props) {
  const { id, timestamp, blockHeight, confirmations, version } =
    transactionHeaderData
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <EntityHeading
          label={title || 'Transaction'}
          type="transaction"
          value={id}
          href={routes.transaction.view.replace(':id', id)}
        />
        {!!timestamp && (
          <LoadingTimestamp>
            <Tooltip content={timestamp}>
              <Text size="18" font="mono" color="subtle" ellipsis>
                {humanDate(timestamp, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}{' '}
              </Text>
            </Tooltip>
          </LoadingTimestamp>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {txType && <Badge variant="accent">{getTxTypeLabel(txType)}</Badge>}
        </div>
        <div className="flex flex-wrap gap-2">
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
          <Tooltip content={'transaction version'}>
            <Badge variant="simple" data-testid="explorer-transaction-version">
              {version}
            </Badge>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
