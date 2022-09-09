import {
  DatumCard,
  Flex,
  PeerList,
  TxPoolList,
} from '@siafoundation/design-system'
import {
  useConsensusTip,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/react-core'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useDialog } from '../../contexts/dialog'

export default function NodePage() {
  const peers = useSyncerPeers()
  const txPool = useTxPoolTransactions({
    refreshInterval: 30_000,
  })
  const tip = useConsensusTip({
    refreshInterval: 30_000,
  })
  const router = useRouter()
  const { openDialog } = useDialog()

  return (
    <HostdAuthedLayout title="Node">
      <Flex gap="3-5" wrap="wrap">
        <DatumCard
          label="Connected peers"
          value={peers.data?.length}
          onClick={() => router.push(routes.node.peers)}
        />
        <DatumCard label="Transactions in pool" value={txPool.data?.length} />
        <DatumCard label="Consensus tip" hash={tip.data} />
      </Flex>
      <PeerList connectPeer={() => openDialog('connectPeer')} />
      <TxPoolList />
    </HostdAuthedLayout>
  )
}
