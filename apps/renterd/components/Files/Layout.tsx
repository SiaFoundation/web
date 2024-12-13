import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FilesDirectoryBreadcrumbMenu } from '../FilesDirectory/FilesDirectoryBreadcrumbMenu'
import { FilesFlatBreadcrumbMenu } from '../FilesFlat/FilesFlatBreadcrumbMenu'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { FilesActionsMenu } from '../FilesDirectory/FilesActionsMenu'
import { FilesDirectoryStatsMenu } from '../FilesDirectory/FilesDirectoryStatsMenu'
import { FilesFlatStatsMenu } from '../FilesFlat/FilesFlatStatsMenu'
import { FilesDirectoryBulkMenu } from '../FilesDirectory/FilesDirectoryBulkMenu'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesFlatBulkMenu } from '../FilesFlat/FilesFlatBulkMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  const { isViewingBuckets, activeExplorerMode } = useFilesManager()

  const directoryModeOrBuckets =
    activeExplorerMode === 'directory' || isViewingBuckets

  if (directoryModeOrBuckets) {
    return {
      title: 'Files',
      navTitle: null,
      routes,
      sidenav: <RenterdSidenav />,
      openSettings: () => openDialog('settings'),
      nav: <FilesDirectoryBreadcrumbMenu />,
      stats: <FilesDirectoryStatsMenu />,
      actions: <FilesActionsMenu />,
      dockedControls: <FilesDirectoryBulkMenu />,
    }
  }

  return {
    title: 'Files',
    navTitle: null,
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    nav: <FilesFlatBreadcrumbMenu />,
    stats: <FilesFlatStatsMenu />,
    actions: <FilesActionsMenu />,
    dockedControls: <FilesFlatBulkMenu />,
  }
}
