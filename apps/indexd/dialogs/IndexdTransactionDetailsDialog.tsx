import {
  TransactionDetailsDialog,
  useRemoteData,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'
import { useTransactions } from '../contexts/transactions'

export function IndexdTransactionDetailsDialog() {
  const { id, dialog, onOpenChange } = useDialog()

  // TODO: fetch transaction so that not dependent on dataset.
  const { dataset } = useTransactions()
  const transaction = useRemoteData(
    {
      dataset,
    },
    ({ dataset }) => {
      return dataset.find((t) => t.id === id)
    },
  )

  return (
    <TransactionDetailsDialog
      id={id}
      transaction={transaction.data}
      open={dialog === 'transactionDetails'}
      onOpenChange={onOpenChange}
    />
  )
}
