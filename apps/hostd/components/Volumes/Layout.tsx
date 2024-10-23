import { Button, Text, Separator } from '@siafoundation/design-system'
import { Add20 } from '@siafoundation/react-icons'
import { humanBytes } from '@siafoundation/units'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useVolumes } from '../../contexts/volumes'
import { VolumesViewDropdownMenu } from './VolumesViewDropdownMenu'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()

  const { dataset } = useVolumes()

  const total = dataset?.reduce((acc, i) => acc + i.totalBytes, 0)
  const used = dataset?.reduce((acc, i) => acc + i.usedBytes, 0)
  const free = total - used
  return {
    title: 'Volumes',
    routes,
    sidenav: <HostdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: (
      <>
        <Button onClick={() => openDialog('volumeCreate')}>
          <Add20 />
          Create volume
        </Button>
        <VolumesViewDropdownMenu />
      </>
    ),
    stats: (
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
    ),
  }
}
