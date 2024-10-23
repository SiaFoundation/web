import { AppAuthedLayout } from '@siafoundation/design-system'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { Profile } from './Profile'
import { WalletdTestnetWarningBanner } from './WalletdTestnetWarningBanner'

type Props = Omit<
  React.ComponentProps<typeof AppAuthedLayout>,
  'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
>

export function WalletdAuthedLayout(props: Props) {
  const { isSynced } = useSyncStatus()
  return (
    <AppAuthedLayout
      appName="walletd"
      profile={<Profile />}
      connectivityRoute={connectivityRoute}
      banner={<WalletdTestnetWarningBanner />}
      showWallet={false}
      isSynced={isSynced}
      {...props}
    />
  )
}

export type WalletdAuthedPageLayoutProps = Omit<Props, 'children'>
