import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/react-hostd'
import BigNumber from 'bignumber.js'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { HostdTestnetWarningBanner } from './HostdTestnetWarningBanner'
import { Profile } from './Profile'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function HostdAuthedLayout(
  props: Omit<
    Props,
    'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
  >
) {
  const wallet = useWallet()
  const { isSynced } = useSyncStatus()
  return (
    <AppAuthedLayout
      appName="hostd"
      connectivityRoute={connectivityRoute}
      banner={<HostdTestnetWarningBanner />}
      profile={<Profile />}
      isSynced={isSynced}
      walletBalance={
        wallet.data
          ? new BigNumber(wallet.data.spendable).plus(wallet.data.unconfirmed)
          : undefined
      }
      {...props}
    />
  )
}
