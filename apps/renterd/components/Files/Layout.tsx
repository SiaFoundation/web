import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { FilesBreadcrumbMenu } from '../FilesDirectory/FilesBreadcrumbMenu'
import { FilesFlatBreadcrumbMenu } from '../FilesFlat/FilesFlatBreadcrumbMenu'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { FilesActionsMenu } from '../FilesDirectory/FilesActionsMenu'
import { FilesStatsMenu } from '../FilesDirectory/FilesStatsMenu'
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
        <FilesBreadcrumbMenu />
      ) : (
        <FilesFlatBreadcrumbMenu />
      ),
    stats: <FilesStatsMenu />,
    actions: <FilesActionsMenu />,
  }
}
