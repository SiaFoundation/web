import { Host } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { CurrencyDisplayProps } from '@siafoundation/design-system'

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
  displayFields: {
    uptime: string
    totalStorage: string
    remainingStorage: string
    remainingStorageUsability: 'usable' | 'warning' | 'unusable'
    storagePrice: CurrencyDisplayProps
    ingressPrice: CurrencyDisplayProps
    egressPrice: CurrencyDisplayProps
    freeSectorPrice: CurrencyDisplayProps
    maxCollateral: CurrencyDisplayProps
    maxContractDuration: string
    protocolVersion: string
    priceValidity: string
    release: string
    countryName: string
    countryFlag: string
  }
}
