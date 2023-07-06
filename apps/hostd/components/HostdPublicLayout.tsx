import { AppPublicLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function HostdPublicLayout(props: Omit<Props, 'appName'>) {
  return <AppPublicLayout appName="hostd" {...props} />
}
