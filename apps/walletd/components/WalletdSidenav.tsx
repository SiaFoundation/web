import { HouseIcon, SidenavItem } from '@siafoundation/design-system'
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
