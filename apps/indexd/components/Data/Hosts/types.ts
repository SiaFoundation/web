import { Host } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type HostLocation =
  | {
      countryCode: 'unknown'
      latitude: 0
      longitude: 0
    }
  | {
      latitude: number
      longitude: number
      countryCode: string
    }

export type HostData = Host & {
  id: string
  usable: boolean
  location: HostLocation
  exchange?: {
    currency: CurrencyOption
    rate: BigNumber
  }
  sortFields: {
    storagePrice: BigNumber
    ingressPrice: BigNumber
    egressPrice: BigNumber
    freeSectorPrice: BigNumber
    maxCollateral: BigNumber
  }
}
