import { PeerList } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'

export default function NodePeersPage() {
  const { openDialog } = useDialog()
  return (
    <HostdAuthedLayout title="Node / Peers">
      <PeerList connectPeer={() => openDialog('connectPeer')} />
    </HostdAuthedLayout>
  )
}
