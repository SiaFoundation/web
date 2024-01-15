'use client'

import {
  triggerToast,
  useClientFilters,
  useDatasetEmptyState,
  useTableState,
} from '@siafoundation/design-system'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { columns } from './columns'
import { defaultSortField, columnsDefaultVisible, sortOptions } from './types'
import { useDataset } from './dataset'
import { useHelia } from '../helia'
import { PeerId } from '@libp2p/interface'
import { peerIdFromString } from '@libp2p/peer-id'
import { Multiaddr } from '@multiformats/multiaddr'
import { throttle } from '@technically/lodash'

type PeerEvent = {
  type: string
  detail: { id: PeerId; multiaddrs?: Multiaddr[] }
  time: number
}

function usePeersMain() {
  const { helia } = useHelia()

  const [events, setEvents] = useState<PeerEvent[]>([])

  const createPeerId = useCallback((id: string) => {
    try {
      const peerId = peerIdFromString(id)
      console.log('Created PeerId:', peerId)
      return peerId
    } catch (err) {
      console.error('Error creating PeerId:', err)
    }
  }, [])

  const dialMultiaddr = useCallback(
    async (addr: PeerId | Multiaddr | Multiaddr[]) => {
      try {
        await helia.libp2p.dial(addr)
      } catch (err) {
        console.error('Error dialing:', err)
      }
    },
    [helia]
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.createPeerId = createPeerId
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.dialMultiaddr = dialMultiaddr

  const {
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('file/v0/peers', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters()

  const { limit, offset, response, dataset } = useDataset({
    helia,
    sortField,
    sortDirection,
    dialMultiaddr,
  })

  const throttledMutate = useCallback(
    throttle(() => {
      response.mutate()
    }, 1000),
    [response]
  )

  useEffect(() => {
    helia?.libp2p.addEventListener('peer:discovery', (evt) => {
      // triggerToast(`Discovered ${evt.detail.id.toString()}`) // Log discovered peer
      setEvents((events) =>
        [
          { type: 'discovery', detail: evt.detail, time: new Date().getTime() },
          ...events,
        ].slice(0, 20)
      )
    })

    helia?.libp2p.addEventListener('peer:connect', (evt) => {
      // triggerToast(`Connected to ${evt.detail.toString()}`) // Log connected peer
      setEvents((events) =>
        [
          {
            type: 'connect',
            detail: { id: evt.detail },
            time: new Date().getTime(),
          },
          ...events,
        ].slice(0, 20)
      )
    })

    helia?.libp2p.addEventListener('peer:disconnect', (evt) => {
      // triggerToast(`Disconnected from ${evt.detail.toString()}`) // Log connected peer
      setEvents((events) =>
        [
          {
            type: 'connect',
            detail: { id: evt.detail },
            time: new Date().getTime(),
          },
          ...events,
        ].slice(0, 20)
      )
    })
  }, [helia])

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  return {
    dataState,
    limit,
    offset,
    datasetPage: dataset,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    events,
  }
}

type State = ReturnType<typeof usePeersMain>

const PeersContext = createContext({} as State)
export const usePeers = () => useContext(PeersContext)

type Props = {
  children: React.ReactNode
}

export function PeersProvider({ children }: Props) {
  const state = usePeersMain()
  return <PeersContext.Provider value={state}>{children}</PeersContext.Provider>
}
