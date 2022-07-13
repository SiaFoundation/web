import { Container } from '@siafoundation/design-system'
import { PeerList } from '../../components/PeerList'
import { AuthedLayout } from '../../components/AuthedLayout'

export default function NodePeersPage() {
  return (
    <AuthedLayout title="Node / Peers">
      <Container size="4" css={{ padding: '$3-5' }}>
        <PeerList />
      </Container>
    </AuthedLayout>
  )
}
