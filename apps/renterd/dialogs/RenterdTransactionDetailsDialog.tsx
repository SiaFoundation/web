import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useDialog } from '../contexts/dialog'
import {
  type TransactionDataConfirmed,
  useTransactions,
} from '../contexts/transactions'

export function RenterdTransactionDetailsDialog() {
  const { id, dialog, onOpenChange } = useDialog()

  // TODO: add transaction endpoint
  const { dataset } = useTransactions()
  const transaction = useMemo(() => {
    return dataset?.find((t) => 'hash' in t && t['hash'] === id)
  }, [dataset, id])

  return (
    <TransactionDetailsDialog
      id={id!}
      transaction={transaction as TransactionDataConfirmed}
      open={dialog === 'transactionDetails'}
      onOpenChange={onOpenChange}
    />
  )
}
