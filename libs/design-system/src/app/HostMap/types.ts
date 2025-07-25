import { V2HostSettings } from '@siafoundation/types'

export type HostMapHost = {
  id: string
  type?: 'host' | 'group'
  publicKey?: string
  location: {
    latitude: number
    longitude: number
    countryCode: string
  }
  v2Settings?: V2HostSettings
  activeContractsCount: number
  isUsable?: boolean
  activeContracts?: { size: number }[]
}
