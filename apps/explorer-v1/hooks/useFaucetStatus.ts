import { SWROptions, useGet } from '@siafoundation/react-core'
import { faucetApi } from '../config'
import { FaucetRequestStatus, Hastings } from './useFaucetFund'

export const faucetKey = `${faucetApi}/request/:id`

type FaucetStatusResponse = {
  id: string
  ipAddress: string
  unlockHash: string
  amount: Hastings
  blockID: string
  transactionID: string
  status: FaucetRequestStatus
  timestamp: string
}

export function useFaucetStatus(
  id?: string,
  options?: SWROptions<FaucetStatusResponse>
) {
  return useGet({ id }, id ? faucetKey : null, {
    ...options,
  })
}
