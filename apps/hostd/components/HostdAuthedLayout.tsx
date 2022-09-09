import {
  SidenavItem,
  HouseIcon,
  HardDriveIcon,
  FileContractIcon,
  BarsProgressIcon,
  AppAuthedLayout,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'
import { routes } from '../config/routes'

type Props = {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
  filters?: React.ReactNode
  size?: React.ComponentProps<typeof AppAuthedLayout>['size']
}

export function HostdAuthedLayout({
  children,
  title,
  actions,
  filters,
  size,
}: Props) {
  const { openDialog } = useDialog()

  return (
    <AppAuthedLayout
      openSettings={() => openDialog('settings')}
      routes={routes}
      sidenav={
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
      }
      title={title}
      actions={actions}
      filters={filters}
      size={size}
    >
      {children}
    </AppAuthedLayout>
  )
}
