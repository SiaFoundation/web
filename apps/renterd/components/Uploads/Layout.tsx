import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { UploadsActionsMenu } from './UploadsActionsMenu'
import { UploadsStatsMenu } from './UploadsStatsMenu'
import { UploadsBreadcrumbMenu } from './UploadsBreadcrumbMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Uploads',
    navTitle: null,
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <UploadsActionsMenu />,
    stats: <UploadsStatsMenu />,
    nav: <UploadsBreadcrumbMenu />,
  }
}
