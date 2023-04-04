import { AppAuthedLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function RenterdAuthedLayout(props: Omit<Props, 'appName'>) {
  return <AppAuthedLayout appName="renterd" {...props} />
}
