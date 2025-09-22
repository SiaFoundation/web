import { Host } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { CurrencyDisplayProps } from '@siafoundation/design-system'

export type HostFilterUsable = {
  id: 'usable'
  value: boolean
}
export type HostFilterBlocked = {
  id: 'blocked'
  value: boolean
}

export type HostFilterActiveContracts = {
  id: 'activecontracts'
  value: boolean
}

export type HostFilter =
  | HostFilterUsable
  | HostFilterBlocked
  | HostFilterActiveContracts
export type HostFilters = HostFilter[]

export function getFilterLabel(filter: HostFilter): string {
  switch (filter.id) {
    case 'usable':
      return filter.value ? 'Usable' : 'Unusable'
    case 'blocked':
      return filter.value ? 'Blocked' : 'Not Blocked'
    case 'activecontracts':
      return filter.value ? 'Active Contracts' : 'No Active Contracts'
    default:
      return ''
  }
}

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
