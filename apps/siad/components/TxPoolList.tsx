import { EntityList, getTransactionTotals } from '@siafoundation/design-system'
import { useTxPoolTransactions } from '@siafoundation/react-core'

export function TxPoolList() {
  const txPool = useTxPoolTransactions()

  return (
    <EntityList
      title="Transaction pool"
      emptyMessage="No transactions in pool"
      entities={txPool.data?.map((t) => ({
        type: 'transaction',
        unconfirmed: true,
        sc: getTransactionTotals(t).sc,
        sf: getTransactionTotals(t).sf,
      }))}
    />
  )
}
