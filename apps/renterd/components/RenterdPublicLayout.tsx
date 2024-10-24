import { AppPublicLayout } from '@siafoundation/design-system'

type Props = Omit<React.ComponentProps<typeof AppPublicLayout>, 'appName'>

export function RenterdPublicLayout(props: Props) {
  return <AppPublicLayout appName="renterd" {...props} />
}

export type RenterdPublicPageLayoutProps = Omit<Props, 'children'>
