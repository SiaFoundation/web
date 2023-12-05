import { webLinks } from '@siafoundation/design-system'
import { useStateHost } from '@siafoundation/react-hostd'

export function useSiascanUrl() {
  const state = useStateHost()
  return state.data?.network === 'Zen Testnet'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
