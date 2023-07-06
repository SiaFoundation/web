import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'
import { WalletdPublicLayout } from '../WalletdPublicLayout'

export function Login() {
  return (
    <WalletdPublicLayout>
      <AppLogin appName="walletd" route={connectivityRoute} routes={routes} />
    </WalletdPublicLayout>
  )
}
