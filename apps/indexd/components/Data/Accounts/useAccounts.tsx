import { useMemo } from 'react'
import { useAdminAccounts } from '@siafoundation/indexd-react'
import { transformAccount } from './transform'
import { useAccountsParams } from './useAccountsParams'

export function useAccounts() {
  const { limit, offset } = useAccountsParams()
  const rawAccounts = useAdminAccounts({
    params: {
      limit,
      offset,
    },
  })
  const accounts = useMemo(
    () =>
      rawAccounts.data?.map((account) => {
        return transformAccount(account)
      }) || [],
    [rawAccounts.data],
  )

  return accounts
}
