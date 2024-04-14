import { webLinks } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/walletd-react'

export function useSiascanUrl() {
  const network = useConsensusNetwork()
  return network.data?.name === 'zen'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
