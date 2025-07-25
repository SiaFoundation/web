import { webLinks } from '@siafoundation/design-system'
import { useIndexdState } from '@siafoundation/indexd-react'

export function useSiascanUrl() {
  const indexd = useIndexdState()
  return indexd.data?.network === 'zen'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
