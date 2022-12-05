import { DatumCard, PeerList, TxPoolList } from '@siafoundation/design-system'
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
      <div className="flex flex-wrap gap-7">
        <DatumCard
          label="Connected peers"
          value={peers.data?.length}
          onClick={() => router.push(routes.node.peers)}
        />
        <DatumCard label="Transactions in pool" value={txPool.data?.length} />
        <DatumCard label="Consensus tip" hash={tip.data?.ID} />
      </div>
      <PeerList connectPeer={() => openDialog('connectPeer')} />
      <TxPoolList />
    </HostdAuthedLayout>
  )
}
