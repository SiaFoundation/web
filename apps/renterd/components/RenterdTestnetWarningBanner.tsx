import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useBusState } from '@siafoundation/renterd-react'

export function RenterdTestnetWarningBanner() {
  const state = useBusState({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!state.data || state.data.network === 'mainnet') {
    return null
  }

  return <TestnetWarningBanner testnetName={state.data.network} />
}
