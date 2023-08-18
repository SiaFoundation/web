import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useBusState } from '@siafoundation/react-renterd'

export function RenterdTestnetWarningBanner() {
  const state = useBusState({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!state.data || state.data.network === 'Mainnet') {
    return null
  }

  return <TestnetWarningBanner testnetName={state.data.network} />
}
