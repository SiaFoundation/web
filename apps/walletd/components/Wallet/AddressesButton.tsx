import { LinkButton } from '@siafoundation/design-system'
import { ListNumbered16 } from '@siafoundation/react-icons'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'

export function AddressesButton() {
  const router = useRouter()
  const id = router.query.id as string
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
