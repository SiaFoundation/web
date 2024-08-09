import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/hostd-react'
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
      walletBalanceSc={
        wallet.data && {
          spendable: new BigNumber(wallet.data.spendable),
          confirmed: new BigNumber(wallet.data.confirmed),
          immature: new BigNumber(wallet.data.immature),
          unconfirmed: new BigNumber(wallet.data.unconfirmed),
        }
      }
      {...props}
    />
  )
}
