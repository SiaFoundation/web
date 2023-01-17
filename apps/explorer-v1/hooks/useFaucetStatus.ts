import { SWROptions, useGet } from '@siafoundation/react-core'
import { apiBase } from '../config'
import { FaucetRequestStatus } from './useFaucetFund'

export const faucetKey = `${apiBase}/faucet/api/request/:id`

type FaucetStatusResponse = {
  id: string
  ipAddress: string
  unlockHash: string
  amount: string
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
