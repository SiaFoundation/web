import { DatumCard, Flex } from '@siafoundation/design-system'
import {
  useConsensusTip,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/react-core'
import { PeerList } from '../../components/PeerList'
import { TxPoolList } from '../../components/TxPoolList'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { AuthedLayout } from '../../components/AuthedLayout'

export default function NodePage() {
  const peers = useSyncerPeers()
  const txPool = useTxPoolTransactions({
    refreshInterval: 30_000,
  })
  const tip = useConsensusTip({
    refreshInterval: 30_000,
  })
  const router = useRouter()

  return (
    <AuthedLayout title="Node">
      <Flex gap="3-5" wrap="wrap">
        <DatumCard
          label="Connected peers"
          value={peers.data?.length}
          onClick={() => router.push(routes.node.peers)}
        />
        <DatumCard label="Transactions in pool" value={txPool.data?.length} />
        <DatumCard label="Consensus tip" hash={tip.data} />
      </Flex>
      <PeerList />
      <TxPoolList />
    </AuthedLayout>
  )
}
