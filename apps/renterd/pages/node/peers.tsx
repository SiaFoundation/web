import { PeerList } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterSidenav } from '../../components/RenterSidenav'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'

export default function NodePeersPage() {
  const { openDialog } = useDialog()
  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      title="Node / Peers"
    >
      <PeerList connectPeer={() => openDialog('connectPeer')} />
    </RenterdAuthedLayout>
  )
}
