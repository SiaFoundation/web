import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'
import { Transaction, TxpoolBroadcastRequest } from './siaTypes'

export function useTxPoolTransactions(options?: SWROptions<Transaction[]>) {
  return useGet('txpool/transactions', options)
}

export function useTxPoolBroadcast() {
  return usePost<TxpoolBroadcastRequest, unknown>('txpool/broadcast', [
    'txpool/transactions',
  ])
}
