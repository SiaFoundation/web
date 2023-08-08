import { TestnetWarningBanner } from '@siafoundation/design-system'
import { useConsensusNetwork } from '@siafoundation/react-renterd'

export function RenterdTestnetWarningBanner() {
  const network = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  if (!network.data || network.data.Name === 'mainnet') {
    return null
  }
  const testnetName =
    network.data.Name === 'zen' ? 'Zen Testnet' : network.data.Name

  return <TestnetWarningBanner testnetName={testnetName} />
}
