import {
  SidenavItem,
  DatabaseIcon,
  FolderIcon,
  FileContractIcon,
  BarsProgressIcon,
  PlaneIcon,
} from '@siafoundation/design-system'
import { routes } from '../config/routes'

export function RenterSidenav() {
  return (
    <>
      {/* <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem> */}
      <SidenavItem title="Files" route={routes.files.index}>
        <FolderIcon />
      </SidenavItem>
      <SidenavItem title="Autopilot" route={routes.autopilot.index}>
        <PlaneIcon />
      </SidenavItem>
      <SidenavItem title="Contracts" route={routes.contracts.index}>
        <FileContractIcon />
      </SidenavItem>
      <SidenavItem title="Hosts" route={routes.hosts.index}>
        <DatabaseIcon />
      </SidenavItem>
      <SidenavItem title="Configuration" route={routes.config.index}>
        <BarsProgressIcon />
      </SidenavItem>
    </>
  )
}
