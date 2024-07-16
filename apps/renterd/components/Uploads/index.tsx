import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { UploadsActionsMenu } from './UploadsActionsMenu'
import { UploadsBreadcrumbMenu } from './UploadsBreadcrumbMenu'
import { UploadsStatsMenu } from './UploadsStatsMenu'
import { UploadsTable } from './UploadsTable'

export function Uploads() {
  const { openDialog } = useDialog()

  return (
    <RenterdAuthedLayout
      title="Uploads"
      navTitle={null}
      routes={routes}
      sidenav={<RenterdSidenav />}
      nav={<UploadsBreadcrumbMenu />}
      stats={<UploadsStatsMenu />}
      actions={<UploadsActionsMenu />}
      openSettings={() => openDialog('settings')}
    >
      <div className="p-6 min-w-fit">
        <UploadsTable />
      </div>
    </RenterdAuthedLayout>
  )
}
