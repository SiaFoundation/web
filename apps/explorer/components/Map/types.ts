import { Location } from '@siafoundation/explored-types'

export type ExplorerPartialHost = {
  publicKey: string
  location: Location
  v2: boolean
  storagePrice: string
  downloadPrice: string
  uploadPrice: string
  remainingStorage: number
  totalStorage: number
}
