import { Transaction, ChainIndex } from '@siafoundation/types'
import { useTxPoolBroadcast } from '@siafoundation/walletd-react'
import { useCallback } from 'react'

export function useBroadcast({ cancel }: { cancel: (t: Transaction) => void }) {
  const txPoolBroadcast = useTxPoolBroadcast()

  const broadcast = useCallback(
    async ({
      signedTransaction,
      basis,
    }: {
      signedTransaction: Transaction
      basis: ChainIndex
    }) => {
      if (!signedTransaction) {
        return {
          error: 'No signed transaction',
        }
      }
      // broadcast
      const broadcastResponse = await txPoolBroadcast.post({
        payload: {
          basis,
          transactions: [signedTransaction],
          v2transactions: [],
        },
      })
      if (broadcastResponse.error) {
        cancel(signedTransaction)
        return {
          error: broadcastResponse.error,
        }
      }

      return {
        // Need transaction ID, but its not part of transaction object
        // transactionId: signResponse.data.??,
      }
    },
    [cancel, txPoolBroadcast]
  )

  return broadcast
}
