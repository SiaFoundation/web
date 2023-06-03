import { AppPublicLayout } from '@siafoundation/design-system'
import { connectivityRoute } from '../config/routes'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function WalletdPublicLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute'>
) {
  return (
    <AppPublicLayout
      appName="walletd"
      connectivityRoute={connectivityRoute}
      {...props}
    />
  )
}
