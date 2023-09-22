import { SidenavItem } from '@siafoundation/design-system'
import { HouseIcon } from '@siafoundation/react-icons'
import { routes } from '../config/routes'

export function WalletdSidenav() {
  return (
    <>
      <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem>
    </>
  )
}
