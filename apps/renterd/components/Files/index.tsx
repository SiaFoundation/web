import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FilesExplorer } from './FilesExplorer'
import { FileNav } from './FileNav'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { FilesActions } from './FilesActions'

export function Files() {
  const { openDialog } = useDialog()

  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      filters={
        <>
          <FileNav />
        </>
      }
      actions={<FilesActions />}
      openSettings={() => openDialog('settings')}
    >
      <div className="p-5">
        <FilesExplorer />
      </div>
    </RenterdAuthedLayout>
  )
}
