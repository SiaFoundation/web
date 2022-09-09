import { SidenavItem, HouseIcon } from '@siafoundation/design-system'
import { routes } from '../config/routes'

export function RenterSidenav() {
  return (
    <>
      <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem>
    </>
  )
}
