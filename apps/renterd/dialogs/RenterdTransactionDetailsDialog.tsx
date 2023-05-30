import { useMemo } from 'react'
import {
  getTransactionType,
  TransactionDetailsDialog,
} from '@siafoundation/design-system'
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
    const txn = transactions.data?.find((t) => t.id === id)
    if (!txn) {
      return null
    }
    return {
      txType: getTransactionType(txn.raw),
      inflow: txn.inflow,
      outflow: txn.outflow,
      timestamp: txn.timestamp,
      raw: txn.raw,
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
