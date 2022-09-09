import { Button } from '../core'
import { EntityList } from '../components'
import { useSyncerPeers } from '@siafoundation/react-core'

type Props = {
  connectPeer: () => void
}

export function PeerList({ connectPeer }: Props) {
  const peers = useSyncerPeers()

  return (
    <EntityList
      title="Peers"
      actions={<Button onClick={connectPeer}>Connect</Button>}
      entities={peers.data?.map((p) => ({
        type: 'ip',
        hash: p.netAddress,
      }))}
    />
  )
}
