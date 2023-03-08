import { useConsensusState } from '@siafoundation/react-core'

export function useConnectivity() {
  const w = useConsensusState()
  return {
    isConnected: !w.error,
    isSynced: w.data?.Synced,
  }
}
