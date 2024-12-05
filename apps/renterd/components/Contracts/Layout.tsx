import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { ContractsFilterBar } from './ContractsFilterBar'
import { ContractsBulkMenu } from './ContractsBulkMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Active contracts',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <ContractsActionsMenu />,
    stats: <ContractsFilterBar />,
    size: 'full',
    scroll: false,
    dockedControls: <ContractsBulkMenu />,
  }
}
