import { Button, EntityList } from '@siafoundation/design-system'
import { useSyncerPeers } from '@siafoundation/react-siad'
import { useDialog } from '../contexts/dialog'

export function PeerList() {
  const { openDialog } = useDialog()
  const peers = useSyncerPeers()

  return (
    <EntityList
      title="Peers"
      actions={
        <>
          <Button onClick={() => openDialog('connectPeer')}>Connect</Button>
        </>
      }
      entities={peers.data?.map((p) => ({
        type: 'ip',
        hash: p.netAddress,
      }))}
    />
  )
}
