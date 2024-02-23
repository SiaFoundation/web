import { SidenavItem, Text } from '@siafoundation/design-system'
import {
  DatabaseIcon,
  FolderIcon,
  FileContractIcon,
  BarsProgressIcon,
  BellIcon,
  KeyIcon,
} from '@siafoundation/react-icons'
import { useAlerts } from '@siafoundation/react-renterd'
import { cx } from 'class-variance-authority'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'

export function RenterdSidenav() {
  const alerts = useAlerts()
  const { openDialog } = useDialog()

  const onlyInfoAlerts = !alerts.data?.find((a) => a.severity !== 'info')
  const alertCount = alerts.data?.length || 0
  return (
    <>
      {/* <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem> */}
      <SidenavItem title="Files" route={routes.buckets.index}>
        <FolderIcon />
      </SidenavItem>
      <SidenavItem title="Configuration" route={routes.config.index}>
        <BarsProgressIcon />
      </SidenavItem>
      <SidenavItem title="Contracts" route={routes.contracts.index}>
        <FileContractIcon />
      </SidenavItem>
      <SidenavItem title="Hosts" route={routes.hosts.index}>
        <DatabaseIcon />
      </SidenavItem>
      <SidenavItem title="S3 authentication keypairs" route={routes.keys.index}>
        <KeyIcon />
      </SidenavItem>
      <div className="relative">
        {!!alertCount && onlyInfoAlerts && (
          <div
            className={cx(
              'absolute -right-[2px] top-px w-1 h-1',
              'rounded-full',
              'bg-gray-1000 dark:bg-white',
              'pointer-events-none'
            )}
          />
        )}
        {!!alertCount && !onlyInfoAlerts && (
          <Text
            size="10"
            className={cx(
              'absolute -right-[9px] -top-1 py-px px-[5px]',
              'text-white',
              'bg-red-500 dark:bg-red-500 rounded',
              'pointer-events-none'
            )}
            color="none"
          >
            {alertCount.toLocaleString()}
          </Text>
        )}
        <SidenavItem title="Alerts" onClick={() => openDialog('alerts')}>
          <BellIcon />
        </SidenavItem>
      </div>
    </>
  )
}
