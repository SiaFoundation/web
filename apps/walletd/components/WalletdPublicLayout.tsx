import { AppPublicLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function WalletdPublicLayout(props: Omit<Props, 'appName'>) {
  return <AppPublicLayout appName="walletd" {...props} />
}
