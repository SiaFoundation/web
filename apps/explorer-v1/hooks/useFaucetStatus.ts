import { useGet } from '@siafoundation/react-core'
import { HookArgsSwr } from '@siafoundation/react-core'
import { faucetApi } from '../config'
import { FaucetRequestStatus, Hastings } from './useFaucetFund'

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
  args: HookArgsSwr<{ id: string }, FaucetStatusResponse>
) {
  console.log(args)
  return useGet({
    api: faucetApi,
    ...args,
    route: '/request/:id',
    disabled: !args.params?.id,
  })
}
