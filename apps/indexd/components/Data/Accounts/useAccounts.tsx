import { useAdminAccounts } from '@siafoundation/indexd-react'
import { transformAccount } from './transform'
import { useAccountsParams } from './useAccountsParams'
import { useRemoteDataset } from '@siafoundation/design-system'

export function useAccounts() {
  const { limit, offset } = useAccountsParams()
  const accounts = useAdminAccounts({
    params: {
      limit,
      offset,
    },
  })
  return useRemoteDataset(
    {
      accounts,
    },
    ({ accounts }) => accounts.map(transformAccount),
    {
      offset,
    },
  )
}
