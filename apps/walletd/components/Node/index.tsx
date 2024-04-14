import { DatumCard, PeerList } from '@siafoundation/design-system'
import {
  useConsensusTip,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/walletd-react'
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

  const transactionCount = txPool.data
    ? (txPool.data.transactions?.length || 0) +
      (txPool.data.v2transactions?.length || 0)
    : 0

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
          <DatumCard label="Transactions in pool" value={transactionCount} />
        </div>
        <div className="flex flex-wrap gap-7">
          <div className="flex-1">
            <PeerList
              isLoading={peers.isValidating}
              peers={peers.data?.map((p) => p.addr)}
              connectPeer={() => openDialog('connectPeer')}
            />
          </div>
          {/* <div className="flex-1">
            <TxPoolList
              isLoading={txPool.isValidating}
              transactions={txPool.data} />
          </div> */}
        </div>
      </div>
    </WalletdAuthedLayout>
  )
}
