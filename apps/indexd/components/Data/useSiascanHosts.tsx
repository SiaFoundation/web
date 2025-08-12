import { useSiascanHostsList } from '@siafoundation/design-system'
import { useAdminState } from '@siafoundation/indexd-react'

export function useSiascanHosts() {
  const state = useAdminState()
  return useSiascanHostsList({
    disabled: !state.data,
    api:
      state.data?.network === 'mainnet'
        ? 'https://api.siascan.com'
        : 'https://api.siascan.com/zen',
    params: {
      sortBy: 'storage_price',
      dir: 'asc',
      limit: 1000,
    },
    payload: {
      online: true,
    },
  })
}
