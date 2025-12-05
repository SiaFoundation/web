import { SidenavItem, Text } from '@siafoundation/design-system'
import {
  DatabaseIcon,
  FolderIcon,
  FileContractIcon,
  BarsProgressIcon,
  BellIcon,
  KeyIcon,
  BugIcon,
  BackupIcon,
} from '@siafoundation/react-icons'
import { cx } from 'class-variance-authority'
import { routes } from '../config/routes'
import { useAlerts } from '../contexts/alerts'
import { useDialog } from '../contexts/dialog'

export function RenterdSidenav() {
  const { openDialog } = useDialog()
  const { totals } = useAlerts()
  const onlyInfoAlerts = totals.all === totals.info
  return (
    <>
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
        {totals.all ? (
          onlyInfoAlerts ? (
            <div
              className={cx(
                'absolute -right-[2px] top-px w-1 h-1',
                'rounded-full',
                'bg-gray-1000 dark:bg-white',
                'pointer-events-none',
              )}
            />
          ) : (
            <Text
              size="10"
              className={cx(
                'absolute -right-[9px] -top-1 py-px px-[5px]',
                'text-white',
                'bg-red-500 dark:bg-red-500 rounded',
                'pointer-events-none',
              )}
              color="none"
            >
              {totals.all.toLocaleString()}
            </Text>
          )
        ) : null}
        <SidenavItem title="Alerts" route={routes.alerts.index}>
          <BellIcon />
        </SidenavItem>
      </div>
      <SidenavItem title="Bug report" onClick={() => openDialog('bugReport')}>
        <BugIcon />
      </SidenavItem>
      <SidenavItem
        title="Backup databases"
        onClick={() => openDialog('backup')}
      >
        <BackupIcon />
      </SidenavItem>
    </>
  )
}
