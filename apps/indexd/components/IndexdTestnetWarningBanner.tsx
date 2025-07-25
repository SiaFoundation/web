import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useIndexdState } from '@siafoundation/indexd-react'

export function IndexdTestnetWarningBanner() {
  const state = useIndexdState({
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
