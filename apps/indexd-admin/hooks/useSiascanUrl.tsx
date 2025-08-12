import { webLinks } from '@siafoundation/design-system'
import { useAdminState } from '@siafoundation/indexd-react'

export function useSiascanUrl() {
  const indexd = useAdminState()
  return indexd.data?.network === 'zen'
    ? webLinks.explore.testnetZen
    : webLinks.explore.mainnet
}
