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
import { FilesDirectoryActionsBottomMenu } from '../FilesDirectory/FilesDirectoryActionsBottomMenu'
import { useFilesManager } from '../../contexts/filesManager'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  const { isViewingBuckets, activeExplorerMode } = useFilesManager()
  const activeMode =
    activeExplorerMode === 'directory' || isViewingBuckets
      ? 'directory'
      : 'flat'
  return {
    title: 'Files',
    navTitle: null,
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    nav:
      activeMode === 'directory' ? (
        <FilesDirectoryBreadcrumbMenu />
      ) : (
        <FilesFlatBreadcrumbMenu />
      ),
    stats: <FilesStatsMenu />,
    actions: <FilesActionsMenu />,
    actionsBottom: activeMode === 'directory' && (
      <FilesDirectoryActionsBottomMenu />
    ),
  }
}
