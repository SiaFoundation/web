'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Libp2p } from 'libp2p'
import { createHelia, Helia } from 'helia'
import { unixfs, UnixFS } from '@helia/unixfs'
import { IDBDatastore } from 'datastore-idb'
import { IDBBlockstore } from 'blockstore-idb'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { webRTC, webRTCDirect } from '@libp2p/webrtc'
import { webSockets } from '@libp2p/websockets'
import { bootstrap } from './bootstrap'

export const bootstrapConfig = {
  list: [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
    '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  ],
}

export type HeliaNode = Helia<Libp2p> | null

function useHeliaMain() {
  const [helia, setHelia] = useState<HeliaNode>(null)
  const [fs, setFs] = useState<UnixFS | null>(null)

  // initialize the database
  useEffect(() => {
    const func = async () => {
      const datastore = new IDBDatastore('files/datastore')
      const blockstore = new IDBBlockstore('files/blockstore')
      await datastore.open()
      await blockstore.open()
      const libp2pOptions = {
        transports: [
          circuitRelayTransport({
            discoverRelays: 1,
          }),
          // tcp(),
          webRTC(),
          webRTCDirect(),
          webSockets(),
        ],
        peerDiscovery: [bootstrap(bootstrapConfig)],
      }

      const helia = await createHelia({
        datastore,
        blockstore,
        libp2p: libp2pOptions,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.helia = helia
      setHelia(helia)
      // create a filesystem on top of Helia, in this case it's UnixFS
      const fs = unixfs(helia)
      setFs(fs)
    }
    func()
    return () => {
      helia?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFile = useCallback(
    async (file: File) => {
      const buffer = await file.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      const cid = await fs.addBytes(bytes)
      await helia.pins.add(cid).next()
      return cid
    },
    [fs, helia]
  )

  return {
    helia,
    fs,
    addFile,
  }
}

type State = ReturnType<typeof useHeliaMain>

const heliaContext = createContext({} as State)
export const useHelia = () => useContext(heliaContext)

type Props = {
  children: React.ReactNode
}

export function HeliaProvider({ children }: Props) {
  const state = useHeliaMain()
  return <heliaContext.Provider value={state}>{children}</heliaContext.Provider>
}
