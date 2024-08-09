import { webLinks } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/hostd-react'

export function useSiascanUrl() {
  const state = useConsensusNetwork()
  return state.data?.name === 'zen'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
