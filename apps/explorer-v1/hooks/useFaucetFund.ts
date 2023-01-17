import { usePost } from '@siafoundation/react-core'
import { apiBase } from '../config'

export const faucetKey = `${apiBase}/faucet/api/request`

export type FaucetRequestStatus = 'pending' | 'broadcast' | 'confirmed'

type FaucetFundPayload = {
  unlockHash: string
  amount: string
}

type FaucetFundResponse = {
  id: string
  ipAddress: string
  unlockHash: string
  amount: string
  blockID: string
  transactionID: string
  status: FaucetRequestStatus
  timestamp: string
}

export function useFaucetFund() {
  return usePost<undefined, FaucetFundPayload, FaucetFundResponse>(faucetKey)
}
