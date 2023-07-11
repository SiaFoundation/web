import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'
import { HostdPublicLayout } from '../HostdPublicLayout'

export function Login() {
  return (
    <HostdPublicLayout>
      <AppLogin appName="hostd" route={connectivityRoute} routes={routes} />
    </HostdPublicLayout>
  )
}
