import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'
import { Transaction } from './siaTypes'

export function useTxPoolTransactions(options?: SWROptions<Transaction[]>) {
  return useGet('txpool/transactions', options)
}

export function useTxPoolBroadcast() {
  return usePost<Transaction[], unknown>('txpool/broadcast', [
    'txpool/transactions',
  ])
}
