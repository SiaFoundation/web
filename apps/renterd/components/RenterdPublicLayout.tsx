import { AppPublicLayout } from '@siafoundation/design-system'
import { connectivityRoute } from '../config/routes'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function RenterdPublicLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute'>
) {
  return (
    <AppPublicLayout
      appName="renterd"
      connectivityRoute={connectivityRoute}
      {...props}
    />
  )
}
