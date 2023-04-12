import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWalletBalance } from '@siafoundation/react-renterd'
import BigNumber from 'bignumber.js'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function RenterdAuthedLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute'>
) {
  const balance = useWalletBalance()
  return (
    <AppAuthedLayout
      appName="renterd"
      connectivityRoute="/bus/consensus/state"
      walletBalance={balance.data ? new BigNumber(balance.data) : undefined}
      {...props}
    />
  )
}
