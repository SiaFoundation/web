import { useMemo } from 'react'
import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'
import { useTransactions } from '../contexts/transactions'

export function RenterdTransactionDetailsDialog() {
  const { id, dialog, onOpenChange } = useDialog()

  // TODO: add transaction endpoint
  const { dataset } = useTransactions()
  const transaction = useMemo(() => {
    return dataset?.find((t) => t.id === id)
  }, [dataset, id])

  return (
    <TransactionDetailsDialog
      id={id}
      transaction={transaction}
      open={dialog === 'transactionDetails'}
      onOpenChange={onOpenChange}
    />
  )
}
