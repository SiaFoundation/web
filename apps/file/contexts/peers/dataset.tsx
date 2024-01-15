'use client'

import useSWR from 'swr'
import { PeerData, SortField } from './types'
import { useSearchParams } from 'next/navigation'
import { HeliaNode } from '../helia'
import { Multiaddr } from '@multiformats/multiaddr'
import { PeerId } from '@libp2p/interface'

type Props = {
  dialMultiaddr: (addr: PeerId | Multiaddr[]) => void
  helia: HeliaNode
  sortDirection: 'asc' | 'desc'
  sortField: SortField
}

const defaultLimit = 50

export function useDataset({
  dialMultiaddr,
  helia,
  sortDirection,
  sortField,
}: Props) {
  // const router = useRouter()
  const query = useSearchParams()
  const limit = Number(query['limit'] || defaultLimit)
  const offset = Number(query['offset'] || 0)

  const response = useSWR<PeerData[]>(
    [helia, 'peers', sortDirection, sortField],
    async () => {
      if (!helia) {
        return []
      }
      const all = await helia.libp2p.peerStore.all()
      const connected = helia.libp2p.getPeers().map((p) => p.toString())
      const peers = all.map((peer) => {
        const id = peer.id.toString()
        const isConnected = connected.includes(id)
        return {
          id,
          isConnected,
          connect: () => dialMultiaddr(peer.id),
          peer,
        }
      })
      if (sortField === 'connection') {
        peers.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.isConnected === b.isConnected ? 0 : a.isConnected ? -1 : 1
          }
          return a.isConnected === b.isConnected ? 0 : a.isConnected ? 1 : -1
        })
      }
      if (sortField === 'name') {
        peers.sort((a, b) => {
          if (sortDirection === 'asc') {
            return a.id.localeCompare(b.id)
          }
          return b.id.localeCompare(a.id)
        })
      }
      return peers
    }
  )

  return {
    limit,
    offset,
    response,
    dataset: response.data || [],
  }
}
