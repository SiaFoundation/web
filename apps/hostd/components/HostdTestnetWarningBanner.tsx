import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/hostd-react'

export function HostdTestnetWarningBanner() {
  const host = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!host.data || host.data.name === 'mainnet') {
    return null
  }

  return <TestnetWarningBanner testnetName={host.data.name} />
}
