import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'

export function Login() {
  return (
    <AppLogin appName="renterd" route={connectivityRoute} routes={routes} />
  )
}
