import { AppPublicLayout } from '@siafoundation/design-system'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function RenterdPublicLayout(
  props: Omit<Props, 'appName' | 'connectivityRoute'>
) {
  return (
    <AppPublicLayout
      appName="renterd"
      connectivityRoute="/bus/consensus/state"
      {...props}
    />
  )
}
