import { useDaemonExplorerHostsList } from '@siafoundation/design-system'

export function useExplorerHosts() {
  return useDaemonExplorerHostsList({
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
