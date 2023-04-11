import { Button } from '../core/Button'
import { EntityList } from '../components/EntityList'

type Props = {
  peers?: string[]
  connectPeer: () => void
}

export function PeerList({ peers, connectPeer }: Props) {
  return (
    <EntityList
      title="Peers"
      actions={<Button onClick={connectPeer}>Connect</Button>}
      entities={
        peers?.map((netAddress) => ({
          type: 'ip',
          hash: netAddress,
        })) || []
      }
    />
  )
}
