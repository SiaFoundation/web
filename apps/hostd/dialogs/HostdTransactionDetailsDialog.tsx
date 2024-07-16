import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useDialog } from '../contexts/dialog'
import { useTransactions } from '../contexts/transactions'

export function HostdTransactionDetailsDialog() {
  const { id, dialog, onOpenChange } = useDialog()
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
