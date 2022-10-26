import { EntityList } from '../components/EntityList'
import { getTransactionTotals, getTransactionTypes } from '../lib/entityTypes'
import { useTxPoolTransactions } from '@siafoundation/react-core'

export function TxPoolList() {
  const txPool = useTxPoolTransactions()

  return (
    <EntityList
      title="Transaction pool"
      emptyMessage="No transactions in pool"
      entities={txPool.data?.map((t) => ({
        type: 'transaction',
        txType: getTransactionTypes(t),
        sc: getTransactionTotals(t).sc,
        sf: getTransactionTotals(t).sf,
      }))}
    />
  )
}
