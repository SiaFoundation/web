import { Button } from '@siafoundation/design-system'
import { Add20 } from '@siafoundation/react-icons'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { VolumesViewDropdownMenu } from './VolumesViewDropdownMenu'
import { VolumesFiltersBar } from './VolumesFiltersBar'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
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
    stats: <VolumesFiltersBar />,
  }
}
