import { DatumCard, PeerList } from '@siafoundation/design-system'
import { useStateConsensus, useSyncerPeers } from '@siafoundation/react-hostd'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { useMemo } from 'react'
import { orderBy } from 'lodash'

export function Node() {
  const peers = useSyncerPeers()
  const state = useStateConsensus({
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  const { openDialog } = useDialog()

  const peerList = useMemo(() => {
    if (!peers.data) {
      return null
    }
    return orderBy(peers.data, ['address']).map((p) => p.address)
  }, [peers.data])

  return (
    <HostdAuthedLayout
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Node"
    >
      <div className="p-6 flex flex-col gap-5">
        <div className="flex flex-wrap gap-7">
          <DatumCard
            label="Height"
            value={
              state.data
                ? state.data.chainIndex.height.toLocaleString()
                : undefined
            }
            comment={!state.data?.synced ? 'Syncing' : undefined}
          />
          <DatumCard label="Connected peers" value={peers.data?.length} />
        </div>
        <PeerList
          peers={peerList}
          connectPeer={() => openDialog('connectPeer')}
        />
      </div>
    </HostdAuthedLayout>
  )
}
