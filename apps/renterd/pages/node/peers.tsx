import { AppAuthedLayout, PeerList } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterSidenav } from '../../components/RenterSidenav'

export default function NodePeersPage() {
  const { openDialog } = useDialog()
  return (
    <AppAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      title="Node / Peers"
    >
      <PeerList connectPeer={() => openDialog('connectPeer')} />
    </AppAuthedLayout>
  )
}
