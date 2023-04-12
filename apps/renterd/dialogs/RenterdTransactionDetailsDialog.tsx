import { useMemo } from 'react'
import { TransactionDetailsDialog } from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-renterd'
import { useDialog } from '../contexts/dialog'

export function RenterdTransactionDetailsDialog() {
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
    const txn = transactions.data?.find((t) => t.ID === id)
    if (!txn) {
      return null
    }
    return {
      inflow: txn.Inflow,
      outflow: txn.Outflow,
      timestamp: txn.Timestamp,
      raw: txn.Raw,
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
