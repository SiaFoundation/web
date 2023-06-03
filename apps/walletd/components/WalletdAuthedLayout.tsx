import { AppAuthedLayout } from '@siafoundation/design-system'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { Profile } from './Profile'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function WalletdAuthedLayout(
  props: Omit<
    Props,
    'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
  >
) {
  const { isSynced } = useSyncStatus()
  return (
    <AppAuthedLayout
      appName="walletd"
      profile={<Profile />}
      connectivityRoute={connectivityRoute}
      showWallet={false}
      isSynced={isSynced}
      {...props}
    />
  )
}
