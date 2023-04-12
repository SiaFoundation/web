import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function HostdAuthedLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute' | 'walletBalance'>
) {
  const wallet = useWallet()
  return (
    <AppAuthedLayout
      appName="renterd"
      connectivityRoute="/state"
      walletBalance={
        wallet.data ? new BigNumber(wallet.data.spendable) : undefined
      }
      {...props}
    />
  )
}
