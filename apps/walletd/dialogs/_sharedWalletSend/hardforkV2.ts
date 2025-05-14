import {
  useConsensusNetwork,
  useConsensusTip,
} from '@siafoundation/walletd-react'

export function useIsPastV2AllowHeight() {
  const n = useConsensusNetwork()
  const ct = useConsensusTip()

  if (!n.data?.hardforkV2.allowHeight || !ct.data?.height) {
    return false
  }
  return ct.data.height > n.data.hardforkV2.allowHeight
}

export function useIsPastV2RequireHeight() {
  const n = useConsensusNetwork()
  const ct = useConsensusTip()

  if (!n.data?.hardforkV2.requireHeight || !ct.data?.height) {
    return false
  }
  return ct.data.height > n.data.hardforkV2.requireHeight
}
