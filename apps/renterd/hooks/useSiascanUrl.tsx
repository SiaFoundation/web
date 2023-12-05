import { webLinks } from '@siafoundation/design-system'
import { useBusState } from '@siafoundation/react-renterd'

export function useSiascanUrl() {
  const network = useBusState()
  return network.data?.network === 'Zen Testnet'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
