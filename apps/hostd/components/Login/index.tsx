import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'

export function Login() {
  return <AppLogin appName="hostd" route={connectivityRoute} routes={routes} />
}
