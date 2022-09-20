import {
  Button,
  AppAuthedLayout,
  CloudUpload16,
  FolderAdd16,
} from '@siafoundation/design-system'
import { RenterSidenav } from '../../components/RenterSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FileExplorer } from '../../components/FileExplorer'
import { FileNav } from '../../components/FileNav'

export default function FilesPage() {
  const { openDialog } = useDialog()

  return (
    <AppAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      filters={
        <>
          <FileNav />
        </>
      }
      actions={
        <>
          <Button>
            <FolderAdd16 />
            Create folder
          </Button>
          <Button>
            <CloudUpload16 />
            Add files
          </Button>
        </>
      }
      openSettings={() => openDialog('settings')}
    >
      <FileExplorer />
    </AppAuthedLayout>
  )
}
