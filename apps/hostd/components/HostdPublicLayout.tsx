import { AppPublicLayout } from '@siafoundation/design-system'
import { connectivityRoute } from '../config/routes'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function HostdPublicLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute'>
) {
  return (
    <AppPublicLayout
      appName="hostd"
      connectivityRoute={connectivityRoute}
      {...props}
    />
  )
}
