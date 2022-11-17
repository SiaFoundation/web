import { AppAuthedLayout } from '@siafoundation/design-system'
import { Providers } from '../config/providers'

type Props = React.ComponentProps<typeof AppAuthedLayout>

export function RenterdAuthedLayout(props: Props) {
  return (
    <Providers>
      <AppAuthedLayout {...props} />
    </Providers>
  )
}
