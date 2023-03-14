import { useConsensusState } from '@siafoundation/react-core'

export function useConnectivity() {
  const w = useConsensusState({
    config: {
      swr: {
        refreshInterval: (data) => (data?.Synced ? 30_000 : 3_000),
      },
    },
  })
  return {
    isConnected: !w.error,
    isSynced: w.data?.Synced,
  }
}
