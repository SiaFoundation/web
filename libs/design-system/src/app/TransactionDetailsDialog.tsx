import { Codeblock } from '../core/Codeblock'
import { Text } from '../core/Text'
import { ValueSc } from '../components/ValueSc'
import { useWalletTransactions } from '@siafoundation/react-core'
import { humanDate } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { Dialog } from '../core/Dialog'
import { getTitleId } from '../lib/utils'

type Props = {
  id: string
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function TransactionDetailsDialog({
  id,
  trigger,
  open,
  onOpenChange,
}: Props) {
  // TODO: add transaction endpoint
  const transactions = useWalletTransactions({
    params: {},
  })
  const transaction = transactions.data?.find((t) => t.ID === id)

  return (
    <Dialog
      title={getTitleId('Transaction', id, 16)}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[800px]',
      }}
    >
      {transactions.data && transaction ? (
        <div className="flex flex-col gap-4 pb-10 w-full overflow-hidden">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-baseline gap-2">
              <Text>Inflow</Text>
              <ValueSc value={new BigNumber(transaction?.Inflow || 0)} />
            </div>
            <div className="flex items-baseline gap-2">
              <Text>Outflow</Text>
              <ValueSc
                value={new BigNumber(transaction?.Outflow || 0).negated()}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <Text>Miner fee</Text>
              <ValueSc
                value={
                  new BigNumber(
                    transaction?.Raw.minerfees?.reduce(
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
                {humanDate(transaction?.Timestamp || 0, { time: true })}
              </Text>
            </div>
          </div>
          <Codeblock>{JSON.stringify(transaction?.Raw, null, 2)}</Codeblock>
        </div>
      ) : (
        <Text>Could not find transaction in wallet</Text>
      )}
    </Dialog>
  )
}
