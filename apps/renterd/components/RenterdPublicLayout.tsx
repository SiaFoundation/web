import { AppPublicLayout } from '@siafoundation/design-system'
import { Providers } from '../config/providers'

type Props = React.ComponentProps<typeof AppPublicLayout>

export function RenterdPublicLayout(props: Props) {
  return (
    <Providers>
      <AppPublicLayout {...props} />
    </Providers>
  )
}
