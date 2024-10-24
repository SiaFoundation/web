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
import { FilesStatsMenu } from '../FilesDirectory/FilesStatsMenu'
import { FilesDirectoryDockedControls } from '../FilesDirectory/FilesDirectoryDockedControls'
import { useFilesManager } from '../../contexts/filesManager'
import { FilesFlatDockedControls } from '../FilesFlat/FilesFlatDockedControls'

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
      stats: <FilesStatsMenu />,
      actions: <FilesActionsMenu />,
      dockedControls: <FilesDirectoryDockedControls />,
    }
  }

  return {
    title: 'Files',
    navTitle: null,
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    nav: <FilesFlatBreadcrumbMenu />,
    stats: <FilesStatsMenu />,
    actions: <FilesActionsMenu />,
    dockedControls: <FilesFlatDockedControls />,
  }
}
