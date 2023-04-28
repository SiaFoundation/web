import { useMemo } from 'react'
import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-hostd'
import { useDialog } from '../contexts/dialog'

export function HostdTransactionDetailsDialog() {
  const { id, dialog, openDialog, closeDialog } = useDialog()

  // TODO: add transaction endpoint
  const transactions = useWalletTransactions({
    params: {},
    config: {
      swr: {
        revalidateOnFocus: false,
        refreshInterval: 60_000,
      },
    },
    disabled: dialog !== 'transactionDetails',
  })
  const transaction = useMemo(() => {
    const txn = transactions.data?.find((t) => t.id === id)
    if (!txn) {
      return null
    }
    return {
      inflow: txn.inflow,
      outflow: txn.outflow,
      timestamp: txn.timestamp,
      raw: txn.transaction,
    }
  }, [transactions, id])

  return (
    <TransactionDetailsDialog
      id={id}
      transaction={transaction}
      open={dialog === 'transactionDetails'}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
