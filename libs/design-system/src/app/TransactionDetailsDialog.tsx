import { Codeblock } from '../core/Codeblock'
import { Text } from '../core/Text'
import { ValueSc } from '../components/ValueSc'
import { humanDate } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { Dialog } from '../core/Dialog'
import { getTitleId } from '../lib/utils'
import { Transaction } from '@siafoundation/react-core'
import { getTxTypeLabel, TxType } from '../lib/entityTypes'
import { upperFirst } from 'lodash'

type Props = {
  id: string
  transaction?: {
    txType: TxType
    inflow: string
    outflow: string
    timestamp: string | number
    raw: Transaction
  }
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function TransactionDetailsDialog({
  id,
  transaction,
  trigger,
  open,
  onOpenChange,
}: Props) {
  return (
    <Dialog
      title={getTitleId(
        transaction?.txType
          ? upperFirst(getTxTypeLabel(transaction.txType))
          : 'Transaction',
        id,
        16
      )}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[800px]',
      }}
    >
      {transaction ? (
        <div className="flex flex-col gap-4 pb-10 w-full overflow-hidden">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-baseline gap-2">
              <Text>Inflow</Text>
              <ValueSc value={new BigNumber(transaction?.inflow || 0)} />
            </div>
            <div className="flex items-baseline gap-2">
              <Text>Outflow</Text>
              <ValueSc
                value={new BigNumber(transaction?.outflow || 0).negated()}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <Text>Miner fee</Text>
              <ValueSc
                value={
                  new BigNumber(
                    transaction?.raw?.minerFees?.reduce(
                      (acc, val) => acc.plus(val),
                      new BigNumber(0)
                    ) || 0
                  )
                }
              />
            </div>
            <div className="flex-1" />
            <div className="flex items-baseline gap-2">
              <Text>Timestamp</Text>
              <Text>
                {humanDate(transaction?.timestamp || 0, {
                  timeStyle: 'short',
                })}
              </Text>
            </div>
          </div>
          <Codeblock>{JSON.stringify(transaction?.raw, null, 2)}</Codeblock>
        </div>
      ) : (
        <Text>Could not find transaction in wallet</Text>
      )}
    </Dialog>
  )
}
