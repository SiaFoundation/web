import { useMemo } from 'react'
import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'
import { useTransactions } from '../contexts/transactions'

export function IndexdTransactionDetailsDialog() {
  const { id, dialog, onOpenChange } = useDialog()

  // TODO: fetch transaction so that not dependent on datasetPage.
  const { datasetPage } = useTransactions()
  const transaction = useMemo(() => {
    return datasetPage?.find((t) => t.id === id)
  }, [datasetPage, id])

  return (
    <TransactionDetailsDialog
      id={id}
      transaction={transaction}
      open={dialog === 'transactionDetails'}
      onOpenChange={onOpenChange}
    />
  )
}
