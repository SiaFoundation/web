import { DatumCard, PeerList } from '@siafoundation/design-system'
import {
  useConsensusState,
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/renterd-react'
import { useDialog } from '../../contexts/dialog'

export function Node() {
  const peers = useSyncerPeers()
  const txPool = useTxPoolTransactions({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  const state = useConsensusState({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  const { openDialog } = useDialog()

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-wrap gap-7">
        <DatumCard
          label="Height"
          value={
            state.data
              ? Number(state.data.blockHeight).toLocaleString()
              : undefined
          }
          comment={!state.data?.synced ? 'Syncing' : undefined}
        />
        <DatumCard label="Connected peers" value={peers.data?.length} />
        <DatumCard label="Transactions in pool" value={txPool.data?.length} />
      </div>
      <PeerList
        peers={peers.data}
        isLoading={peers.isValidating}
        connectPeer={() => openDialog('connectPeer')}
      />
    </div>
  )
}
