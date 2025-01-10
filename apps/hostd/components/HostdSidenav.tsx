import { SidenavItem, Text } from '@siafoundation/design-system'
import {
  FileContractIcon,
  BarsProgressIcon,
  HouseIcon,
  HardDriveIcon,
  BellIcon,
} from '@siafoundation/react-icons'
import { useAlerts } from '@siafoundation/hostd-react'
import { cx } from 'class-variance-authority'
import { routes } from '../config/routes'

export function HostdSidenav() {
  const alerts = useAlerts()

  const onlyInfoAlerts = !alerts.data?.find((a) => a.severity !== 'info')
  const alertCount = alerts.data?.length || 0
  return (
    <>
      <SidenavItem title="Dashboard" route={routes.home}>
        <HouseIcon />
      </SidenavItem>
      <SidenavItem title="Volumes" route={routes.volumes.index}>
        <HardDriveIcon />
      </SidenavItem>
      <SidenavItem title="Contracts" route={routes.contracts.index}>
        <FileContractIcon />
      </SidenavItem>
      <SidenavItem title="Configuration" route={routes.config.index}>
        <BarsProgressIcon />
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
        <SidenavItem title="Alerts" route={routes.alerts.index}>
          <BellIcon />
        </SidenavItem>
      </div>
    </>
  )
}
