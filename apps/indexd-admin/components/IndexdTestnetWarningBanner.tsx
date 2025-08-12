import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useAdminState } from '@siafoundation/indexd-react'

export function IndexdTestnetWarningBanner() {
  const state = useAdminState({
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
