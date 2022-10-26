import { Button } from '../core/Button'
import { EntityList } from '../components/EntityList'
import { useSyncerPeers } from '@siafoundation/react-core'
import { sortBy } from 'lodash'

type Props = {
  connectPeer: () => void
}

export function PeerList({ connectPeer }: Props) {
  const peers = useSyncerPeers()

  return (
    <EntityList
      title="Peers"
      actions={<Button onClick={connectPeer}>Connect</Button>}
      entities={sortBy(peers.data || []).map((netAddress) => ({
        type: 'ip',
        hash: netAddress,
      }))}
    />
  )
}
