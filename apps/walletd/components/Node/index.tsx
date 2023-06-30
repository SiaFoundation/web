import { DatumCard, PeerList } from '@siafoundation/design-system'
import {
  useConsensusTip,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/react-walletd'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'

export function Node() {
  const peers = useSyncerPeers()
  const txPool = useTxPoolTransactions({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  const state = useConsensusTip({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  const { openDialog } = useDialog()

  return (
    <WalletdAuthedLayout
      routes={routes}
      sidenav={<WalletdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Node"
    >
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-wrap gap-7">
          <DatumCard
            label="Height"
            value={
              state.data
                ? Number(state.data.height).toLocaleString()
                : undefined
            }
            // comment={!state.data?.synced ? 'Syncing' : undefined}
          />
          <DatumCard label="Connected peers" value={peers.data?.length} />
          <DatumCard label="Transactions in pool" value={txPool.data?.length} />
        </div>
        <div className="flex flex-wrap gap-7">
          <div className="flex-1">
            <PeerList
              peers={peers.data?.map((p) => p.addr)}
              connectPeer={() => openDialog('connectPeer')}
            />
          </div>
          {/* <div className="flex-1">
            <TxPoolList transactions={txPool.data} />
          </div> */}
        </div>
      </div>
    </WalletdAuthedLayout>
  )
}
