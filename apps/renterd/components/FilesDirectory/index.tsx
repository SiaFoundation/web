import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FilesBreadcrumbMenu } from './FilesBreadcrumbMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { FilesActionsMenu } from './FilesActionsMenu'
import { FilesStatsMenu } from './FilesStatsMenu'
import { FilesExplorer } from './FilesExplorer'

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
