import { Result, V2Transaction } from '@siafoundation/types'
import { useTxPoolBroadcast } from '@siafoundation/walletd-react'
import { useCallback } from 'react'
import { ChainIndex } from '@siafoundation/types'
import { useCancelV2 } from './useCancelV2'

export function useBroadcastV2() {
  const cancel = useCancelV2()
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
    }): Promise<Result<{ id: string }>> => {
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
        id,
      }
    },
    [cancel, txPoolBroadcast]
  )

  return broadcast
}
