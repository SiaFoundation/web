import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/renterd-react'
import BigNumber from 'bignumber.js'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { Profile } from './Profile'
import { RenterdTestnetWarningBanner } from './RenterdTestnetWarningBanner'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function RenterdAuthedLayout(
  props: Omit<
    Props,
    'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
  >
) {
  const wallet = useWallet()
  const { isSynced } = useSyncStatus()
  return (
    <AppAuthedLayout
      appName="renterd"
      profile={<Profile />}
      banner={<RenterdTestnetWarningBanner />}
      connectivityRoute={connectivityRoute}
      isSynced={isSynced}
      walletBalanceSc={
        wallet.data && {
          spendable: new BigNumber(wallet.data.spendable),
          confirmed: new BigNumber(wallet.data.confirmed),
          unconfirmed: new BigNumber(wallet.data.unconfirmed),
        }
      }
      {...props}
    />
  )
}
