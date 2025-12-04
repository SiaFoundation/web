import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/hostd-react'
import BigNumber from 'bignumber.js'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { useNetAddressOrAppName } from '../hooks/usePageTitle'
import { HostdTestnetWarningBanner } from './HostdTestnetWarningBanner'
import { Profile } from './Profile'
import { DockedControls } from './DockedControls'

type Props = Omit<
  React.ComponentProps<typeof AppAuthedLayout>,
  'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
>

export function HostdAuthedLayout({ dockedControls, ...props }: Props) {
  const wallet = useWallet()
  const { isSynced } = useSyncStatus()
  const title = useNetAddressOrAppName('hostd')
  return (
    <AppAuthedLayout
      appName={title}
      connectivityRoute={connectivityRoute}
      profile={<Profile />}
      banner={<HostdTestnetWarningBanner />}
      isSynced={isSynced}
      walletBalanceSc={
        wallet.data && {
          spendable: new BigNumber(wallet.data.spendable),
          confirmed: new BigNumber(wallet.data.confirmed),
          immature: new BigNumber(wallet.data.immature),
          unconfirmed: new BigNumber(wallet.data.unconfirmed),
        }
      }
      dockedControls={<DockedControls>{dockedControls}</DockedControls>}
      {...props}
    />
  )
}

export type HostdAuthedPageLayoutProps = Omit<Props, 'children'>
