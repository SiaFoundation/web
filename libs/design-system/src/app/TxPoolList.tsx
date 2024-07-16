import type { Transaction } from '@siafoundation/types'
import { EntityList } from '../components/EntityList'
import { getTransactionTotals, getTransactionType } from '../lib/entityTypes'

type Props = {
  isLoading?: boolean
  transactions?: Transaction[]
}

export function TxPoolList({ transactions, isLoading }: Props) {
  return (
    <EntityList
      title="Transaction pool"
      emptyMessage="No transactions in pool"
      isLoading={isLoading}
      dataset={transactions?.map((t) => ({
        type: 'transaction',
        txType: getTransactionType(t),
        sc: getTransactionTotals(t).sc,
        sf: getTransactionTotals(t).sf,
      }))}
    />
  )
}
