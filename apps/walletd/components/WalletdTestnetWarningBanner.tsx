import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/walletd-react'

export function WalletdTestnetWarningBanner() {
  const network = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!network.data || network.data.name === 'mainnet') {
    return null
  }

  const testnetName =
    network.data.name === 'zen' ? 'Zen Testnet' : network.data.name

  return <TestnetWarningBanner testnetName={testnetName} />
}
