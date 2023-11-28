import { Button } from '../core/Button'
import { EntityList } from '../components/EntityList'

type Props = {
  peers?: string[]
  isLoading?: boolean
  connectPeer: () => void
}

export function PeerList({ peers, isLoading, connectPeer }: Props) {
  return (
    <EntityList
      title="Peers"
      actions={<Button onClick={connectPeer}>Connect</Button>}
      isLoading={isLoading}
      dataset={
        peers?.map((netAddress) => ({
          type: 'ip',
          hash: netAddress,
        })) || []
      }
    />
  )
}
