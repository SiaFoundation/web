import { AppAuthedLayout } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/renterd-react'
import BigNumber from 'bignumber.js'
import { connectivityRoute } from '../config/routes'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { Profile } from './Profile'
import { RenterdTestnetWarningBanner } from './RenterdTestnetWarningBanner'
import { DockedControls } from './DockedControls'

type Props = Omit<
  React.ComponentProps<typeof AppAuthedLayout>,
  'appName' | 'connectivityRoute' | 'walletBalance' | 'profile' | 'isSynced'
>

export function RenterdAuthedLayout({ dockedControls, ...props }: Props) {
  const wallet = useWallet()
  const { isSynced } = useSyncStatus()
  return (
    <AppAuthedLayout
      appName="renterd"
      connectivityRoute={connectivityRoute}
      profile={<Profile />}
      banner={<RenterdTestnetWarningBanner />}
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

export type RenterdAuthedPageLayoutProps = Omit<Props, 'children'>
