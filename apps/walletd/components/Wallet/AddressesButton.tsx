import { LinkButton } from '@siafoundation/design-system'
import { ListNumbered16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { useParams } from 'next/navigation'
import { Maybe } from '@siafoundation/types'

export function AddressesButton() {
  const params = useParams<Maybe<{ id: Maybe<string> }>>()
  const id = params?.id
  return (
    <LinkButton
      aria-label="view addresses"
      href={{
        pathname: routes.wallet.addresses,
        query: {
          id,
        },
      }}
    >
      <ListNumbered16 />
      Addresses
    </LinkButton>
  )
}
