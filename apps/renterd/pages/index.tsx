import { AppAuthedLayout } from '@siafoundation/design-system'
import { RenterSidenav } from '../components/RenterSidenav'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'

export default function HomePage() {
  const { openDialog } = useDialog()
  return (
    <AppAuthedLayout
      title="Overview"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
    >
      home
    </AppAuthedLayout>
  )
}
