import { V2Transaction } from '@siafoundation/types'
import { useTxPoolBroadcast } from '@siafoundation/walletd-react'
import { useCallback } from 'react'
import { ChainIndex } from '@siafoundation/types'

export function useBroadcastV2({
  cancel,
}: {
  cancel: (t: V2Transaction) => void
}) {
  const txPoolBroadcast = useTxPoolBroadcast()

  const broadcast = useCallback(
    async ({
      id,
      basis,
      signedTransaction,
    }: {
      id: string
      basis: ChainIndex
      signedTransaction: V2Transaction
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
          transactions: [],
          v2transactions: [signedTransaction],
        },
      })
      if (broadcastResponse.error) {
        cancel(signedTransaction)
        return {
          error: broadcastResponse.error,
        }
      }

      return {
        transactionId: id,
      }
    },
    [cancel, txPoolBroadcast]
  )

  return broadcast
}
