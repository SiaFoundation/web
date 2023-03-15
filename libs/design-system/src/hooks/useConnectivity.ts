import { useConsensusState } from '@siafoundation/react-core'

export function useConnectivity() {
  const w = useConsensusState({
    config: {
      swr: {
        refreshInterval: (data) => (data?.Synced ? 30_000 : 1_000),
      },
    },
  })
  return {
    isConnected: !w.error,
    isSynced: w.data?.Synced,
  }
}
