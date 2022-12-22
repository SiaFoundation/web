import { useConsensusState } from '@siafoundation/react-core'

export function useConnectivity() {
  const w = useConsensusState()

  const connError = w.error

  const daemon = connError?.status !== 504
  const wallet = !w.error

  return {
    daemon,
    wallet,
  }
}

export type Connectivity = ReturnType<typeof useConnectivity>
