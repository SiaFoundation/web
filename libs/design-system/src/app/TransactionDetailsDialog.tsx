import { Codeblock } from '../core/Codeblock'
import { Text } from '../core/Text'
import { ValueSc } from '../components/ValueSc'
import { useWalletTransactions } from '@siafoundation/react-core'
import { humanDate } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

type Props = {
  id: string
}

export function TransactionDetailsDialog({ id }: Props) {
  // TODO: add transaction endpoint
  const transactions = useWalletTransactions()
  const transaction = transactions.data?.find((t) => t.ID === id)

  if (transactions.data && !transaction) {
    return <Text>Could not find transaction in wallet</Text>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex gap-2">
          <Text>Inflow</Text>
          <ValueSc value={new BigNumber(transaction?.Inflow || 0)} />
        </div>
        <div className="flex gap-2">
          <Text>Outflow</Text>
          <ValueSc value={new BigNumber(transaction?.Outflow || 0).negated()} />
        </div>
        <div className="flex gap-2">
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
        <div className="flex gap-2">
          <Text>Timestamp</Text>
          <Text>{humanDate(transaction?.Timestamp || 0, { time: true })}</Text>
        </div>
      </div>
      <div className="">
        <Codeblock>{JSON.stringify(transaction?.Raw, null, 2)}</Codeblock>
      </div>
    </div>
  )
}
