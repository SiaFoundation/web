import { AppPublicLayout } from '@siafoundation/design-system'

type Props = Omit<React.ComponentProps<typeof AppPublicLayout>, 'appName'>

export function WalletdPublicLayout(props: Props) {
  return <AppPublicLayout appName="walletd" {...props} />
}

export type WalletdPublicPageLayoutProps = Omit<Props, 'children'>
