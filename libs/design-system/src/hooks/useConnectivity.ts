import { useConsensusState } from '@siafoundation/react-core'

export function useConnectivity() {
  const w = useConsensusState()
  return !w.error
}
