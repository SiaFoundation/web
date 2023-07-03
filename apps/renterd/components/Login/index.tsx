import { AppLogin } from '@siafoundation/design-system'
import { connectivityRoute, routes } from '../../config/routes'
import { RenterdPublicLayout } from '../RenterdPublicLayout'

export function Login() {
  return (
    <RenterdPublicLayout routes={routes}>
      <AppLogin appName="renterd" route={connectivityRoute} routes={routes} />
    </RenterdPublicLayout>
  )
}
