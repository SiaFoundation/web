import { AppPublicLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function RenterdPublicLayout(props: Omit<Props, 'appName'>) {
  return <AppPublicLayout appName="renterd" {...props} />
}
