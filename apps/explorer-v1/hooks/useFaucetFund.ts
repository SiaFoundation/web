import { usePost } from '@siafoundation/react-core'
import { faucetApi } from '../config'

export type FaucetRequestStatus = 'pending' | 'broadcast' | 'confirmed'

export type Hastings = string

type FaucetFundPayload = {
  unlockHash: string
  amount: Hastings
}

type FaucetFundResponse = {
  id: string
  ipAddress: string
  unlockHash: string
  amount: Hastings
  blockID: string
  transactionID: string
  status: FaucetRequestStatus
  timestamp: string
}

export function useFaucetFund() {
  return usePost<undefined, FaucetFundPayload, FaucetFundResponse>(
    {
      api: faucetApi,
      route: '/request',
    },
    []
  )
}
