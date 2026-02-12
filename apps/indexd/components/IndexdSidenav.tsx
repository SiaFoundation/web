import { SidenavItem } from '@siafoundation/design-system'
import {
  BarsProgressIcon,
  ChartIcon,
  BugIcon,
  DatabaseIcon,
  FileContractIcon,
  KeyIcon,
  BellIcon,
  UsersIcon,
  GaugeIcon,
} from '@siafoundation/react-icons'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useSearchParams } from 'next/navigation'
import { routeWithParams } from '../lib/navigation'

export function IndexdSidenav() {
  const { openDialog } = useDialog()
  const params = useSearchParams()
  return (
    <>
      <SidenavItem
        title="Hosts"
        route={routeWithParams(routes.hosts.index, params)}
      >
        <DatabaseIcon />
      </SidenavItem>
      <SidenavItem
        title="Contracts"
        route={routeWithParams(routes.contracts.index, params)}
      >
        <FileContractIcon />
      </SidenavItem>
      <SidenavItem
        title="Connect keys"
        route={routeWithParams(routes.keys.index, params)}
      >
        <KeyIcon />
      </SidenavItem>
      <SidenavItem
        title="Quotas"
        route={routeWithParams(routes.quotas.index, params)}
      >
        <GaugeIcon />
      </SidenavItem>
      <SidenavItem
        title="Accounts"
        route={routeWithParams(routes.accounts.index, params)}
      >
        <UsersIcon />
      </SidenavItem>
      <SidenavItem
        title="Alerts"
        route={routeWithParams(routes.alerts.index, params)}
      >
        <BellIcon />
      </SidenavItem>
      <SidenavItem
        title="Configuration"
        route={routeWithParams(routes.config.index, params)}
      >
        <BarsProgressIcon />
      </SidenavItem>
      <SidenavItem
        title="Metrics"
        route={routeWithParams(routes.metrics.index, params)}
      >
        <ChartIcon />
      </SidenavItem>
      <SidenavItem title="Bug report" onClick={() => openDialog('bugReport')}>
        <BugIcon />
      </SidenavItem>
    </>
  )
}
