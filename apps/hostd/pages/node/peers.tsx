import { PeerList } from '../../components/PeerList'
import { AuthedLayout } from '../../components/AuthedLayout'

export default function NodePeersPage() {
  return (
    <AuthedLayout title="Node / Peers">
      <PeerList />
    </AuthedLayout>
  )
}
