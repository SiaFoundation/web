import { Button } from '../core'
import { EntityList } from '../components'
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
