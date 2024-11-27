import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { ContractsFiltersBar } from './ContractsFiltersBar'
import { ContractsBulkMenu } from './ContractsBulkMenu'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Contracts',
    routes,
    sidenav: <HostdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <ContractsActionsMenu />,
    stats: <ContractsFiltersBar />,
    size: 'full',
    dockedControls: <ContractsBulkMenu />,
  }
}
