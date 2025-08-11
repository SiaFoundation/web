import { useMemo } from 'react'
import { useAccounts as useIndexAccounts } from '@siafoundation/indexd-react'
import { transformAccount } from './transform'
import { useAccountsParams } from './useAccountsParams'

export function useAccounts() {
  const { limit, offset } = useAccountsParams()
  const rawAccounts = useIndexAccounts({
    params: {
      limit,
      offset,
    },
  })
  const accounts = useMemo(
    () =>
      rawAccounts.data?.map((publicKey) => {
        return transformAccount(publicKey)
      }) || [],
    [rawAccounts.data],
  )

  return accounts
}
