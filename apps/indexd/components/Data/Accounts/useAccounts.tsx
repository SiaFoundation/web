import { useAdminAccounts } from '@siafoundation/indexd-react'
import { transformAccount } from './transform'
import { useAccountsParams } from './useAccountsParams'
import { useRemoteDataset } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { AdminAccountsParams } from '@siafoundation/indexd-types'

export function useAccounts() {
  const { limit, offset, columnFilters } = useAccountsParams()
  const params = useMemo(() => {
    const filters: AdminAccountsParams = { offset, limit }
    const connectkey = columnFilters.find((f) => f.id === 'connectkey')?.value
    if (connectkey !== undefined) {
      filters.connectkey = connectkey
    }
    return filters
  }, [columnFilters, offset, limit])
  const accounts = useAdminAccounts({
    params,
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
