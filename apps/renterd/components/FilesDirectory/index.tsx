import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { FilesActionsMenu } from './FilesActionsMenu'
import { FilesBreadcrumbMenu } from './FilesBreadcrumbMenu'
import { FilesExplorer } from './FilesExplorer'
import { FilesStatsMenu } from './FilesStatsMenu'

export function FilesDirectory() {
  const { openDialog } = useDialog()

  return (
    <RenterdAuthedLayout
      title="Files"
      navTitle={null}
      routes={routes}
      sidenav={<RenterdSidenav />}
      nav={<FilesBreadcrumbMenu />}
      stats={<FilesStatsMenu />}
      actions={<FilesActionsMenu />}
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 min-w-fit">
        <FilesExplorer />
      </div>
    </RenterdAuthedLayout>
  )
}
