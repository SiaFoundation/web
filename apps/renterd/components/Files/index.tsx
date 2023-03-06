import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FilesExplorer } from './FilesExplorer'
import { FilesBreadcrumbMenu } from './FilesBreadcrumbMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { FilesActionsMenu } from './FilesActionsMenu'

export function Files() {
  const { openDialog } = useDialog()

  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      nav={<FilesBreadcrumbMenu />}
      actions={<FilesActionsMenu />}
      openSettings={() => openDialog('settings')}
    >
      <div className="p-5">
        <FilesExplorer />
      </div>
    </RenterdAuthedLayout>
  )
}
