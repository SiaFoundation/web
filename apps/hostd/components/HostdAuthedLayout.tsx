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
import { Providers } from '../config/providers'

type Props = {
  title: string
  children: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
  size?: React.ComponentProps<typeof AppAuthedLayout>['size']
}

export function HostdAuthedLayout({
  children,
  title,
  nav,
  actions,
  size,
}: Props) {
  const { openDialog } = useDialog()

  return (
    <Providers>
      <AppAuthedLayout
        appName="hostd"
        title={title}
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
        actions={actions}
        nav={nav}
        size={size}
      >
        {children}
      </AppAuthedLayout>
    </Providers>
  )
}
