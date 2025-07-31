import { useMemo } from 'react'
import { useAccounts as useIndexAccounts } from '@siafoundation/indexd-react'
import { transformAccount } from './transform'

export function useAccounts() {
  const rawAccounts = useIndexAccounts({
    params: {
      limit: 500,
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
