import { NetAddress } from '@siafoundation/explored-types'
import { V2HostSettings } from '@siafoundation/types'
import axios from 'axios'

export type TroubleshooterRequest = {
  publicKey: string
  rhp4NetAddresses?: NetAddress[]
}

type TroubleshooterRHP4Entry = {
  connected: boolean
  dialTime: number
  errors: string[]
  warnings: string[]
  handshake: boolean
  handshakeTime: number
  netAddress: NetAddress
  resolvedAddresses: string[] | null
  scanTime: number
  scanned: true
  settings: V2HostSettings | null
}

export type TroubleshooterResponse = {
  publicKey: string
  rhp4: TroubleshooterRHP4Entry[]
  version: string
}

const troubleshooterMainnetApi = 'https://api.siascan.com/troubleshoot'
const troubleshooterZenApi = 'https://api.siascan.com/zen/troubleshoot'

type GetTroubleshooterDataArgs = {
  request: TroubleshooterRequest
  network: 'mainnet' | 'zen'
}

export async function getTroubleshooterData({
  request,
  network,
}: GetTroubleshooterDataArgs) {
  const api =
    network === 'mainnet' ? troubleshooterMainnetApi : troubleshooterZenApi

  return axios.post(api, request)
}
