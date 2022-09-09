import {
  DatumCard,
  Flex,
  AppAuthedLayout,
  TxPoolList,
  PeerList,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import {
  useConsensusTip,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/react-core'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterSidenav } from '../../components/RenterSidenav'

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
    <AppAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      title="Node"
    >
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
    </AppAuthedLayout>
  )
}
