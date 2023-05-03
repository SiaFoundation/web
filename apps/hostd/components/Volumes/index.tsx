import {
  Button,
  Add20,
  Table,
  Text,
  Separator,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useVolumes } from '../../contexts/volumes'
import { VolumesViewDropdownMenu } from './VolumesViewDropdownMenu'

export function Volumes() {
  const { openDialog } = useDialog()

  const { dataset, isLoading, columns } = useVolumes()

  const total = dataset?.reduce((acc, i) => acc + i.totalBytes, 0)
  const used = dataset?.reduce((acc, i) => acc + i.usedBytes, 0)
  const free = total - used

  return (
    <HostdAuthedLayout
      title="Volumes"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      actions={
        <>
          <Button onClick={() => openDialog('volumeCreate')}>
            <Add20 />
            Create volume
          </Button>
          <VolumesViewDropdownMenu />
        </>
      }
      stats={
        <div className="flex gap-4">
          <Text size="12" font="mono" weight="medium">{`${humanBytes(
            used
          )} used`}</Text>
          <Separator variant="vertical" />
          <Text size="12" font="mono" weight="medium">{`${humanBytes(
            free
          )} free`}</Text>
          <Separator variant="vertical" />
          <Text size="12" font="mono" weight="medium">{`${humanBytes(
            total
          )} total`}</Text>
        </div>
      }
    >
      <div className="p-6 min-w-fit">
        <Table
          isLoading={isLoading}
          pageSize={20}
          data={dataset}
          columns={columns}
        />
      </div>
    </HostdAuthedLayout>
  )
}
