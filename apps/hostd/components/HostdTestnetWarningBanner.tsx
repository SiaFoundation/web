import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useStateHost } from '@siafoundation/react-hostd'

export function HostdTestnetWarningBanner() {
  const host = useStateHost({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!host.data || host.data.network === 'Mainnet') {
    return null
  }

  return <TestnetWarningBanner testnetName={host.data.network} />
}
