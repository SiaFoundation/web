import { LinkButton } from '@siafoundation/design-system'
import { ListNumbered16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { useParams } from 'next/navigation'

export function AddressesButton() {
  const params = useParams<{ id: string }>()
  const id = params.id
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
