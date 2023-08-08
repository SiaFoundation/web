import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/react-renterd'
import BigNumber from 'bignumber.js'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { Profile } from './Profile'

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
      connectivityRoute={connectivityRoute}
      isSynced={isSynced}
      walletBalance={
        wallet.data ? new BigNumber(wallet.data.confirmed) : undefined
      }
      {...props}
    />
  )
}
