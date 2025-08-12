import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'

export function Login() {
  return <AppLogin appName="indexd" route={connectivityRoute} routes={routes} />
}
