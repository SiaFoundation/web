import {
  SidenavItem,
  FileContractIcon,
  BarsProgressIcon,
  HouseIcon,
  HardDriveIcon,
} from '@siafoundation/design-system'
import { routes } from '../config/routes'

export function HostdSidenav() {
  return (
    <>
      <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem>
      <SidenavItem title="Storage" route={routes.storage.index}>
        <HardDriveIcon />
      </SidenavItem>
      <SidenavItem title="Contracts" route={routes.contracts.index}>
        <FileContractIcon />
      </SidenavItem>
      <SidenavItem title="Configuration" route={routes.config.index}>
        <BarsProgressIcon />
      </SidenavItem>
    </>
  )
}
