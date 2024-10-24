import { webLinks } from '@siafoundation/design-system'
import { useBusState } from '@siafoundation/renterd-react'

export function useSiascanUrl() {
  const network = useBusState()
  return network.data?.network === 'zen'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
