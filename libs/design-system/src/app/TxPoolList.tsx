import { EntityList } from '../components/EntityList'
import { getTransactionTotals, getTransactionTypes } from '../lib/entityTypes'
import { Transaction } from '@siafoundation/react-core'

type Props = {
  transactions?: Transaction[]
}

export function TxPoolList({ transactions }: Props) {
  return (
    <EntityList
      title="Transaction pool"
      emptyMessage="No transactions in pool"
      entities={transactions?.map((t) => ({
        type: 'transaction',
        txType: getTransactionTypes(t),
        sc: getTransactionTotals(t).sc,
        sf: getTransactionTotals(t).sf,
      }))}
    />
  )
}
