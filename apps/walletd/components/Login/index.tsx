import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'
import { WalletdPublicLayout } from '../WalletdPublicLayout'

export function Login() {
  return (
    <WalletdPublicLayout routes={routes}>
      <AppLogin appName="walletd" route={connectivityRoute} routes={routes} />
    </WalletdPublicLayout>
  )
}
