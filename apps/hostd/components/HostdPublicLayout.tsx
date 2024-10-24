import { AppPublicLayout } from '@siafoundation/design-system'

type Props = Omit<React.ComponentProps<typeof AppPublicLayout>, 'appName'>

export function HostdPublicLayout(props: Props) {
  return <AppPublicLayout appName="hostd" {...props} />
}

export type HostdPublicPageLayoutProps = Omit<Props, 'children'>
