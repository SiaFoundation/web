import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'

export function Login() {
  return (
    <AppLogin appName="walletd" route={connectivityRoute} routes={routes} />
  )
}
