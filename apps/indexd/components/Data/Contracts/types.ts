import { Contract } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { CurrencyDisplayProps } from '@siafoundation/design-system'
import { V2HostSettings } from '@siafoundation/types'

export type ContractFilterStatus = {
  id: 'status'
  value: boolean
}

export type ContractFilterRevisable = {
  id: 'revisable'
  value: boolean
}

export type ContractFilter = ContractFilterStatus | ContractFilterRevisable
export type ContractFilters = ContractFilter[]

export function getFilterLabel(filter: ContractFilter): string {
  if (filter.id === 'status') {
    return filter.value ? 'Status is good' : 'Status is bad'
  }
  if (filter.id === 'revisable') {
    return filter.value ? 'Revisable' : 'Not revisable'
  }
  return ''
}

export type ContractData = Contract & {
  id: string
  host?: {
    location: {
      countryCode: string
      latitude: number
      longitude: number
    }
    v2Settings?: V2HostSettings
  }
  exchange?: {
    currency: CurrencyOption
    rate: BigNumber
  }
  displayFields: {
    contractPrice: CurrencyDisplayProps
    minerFee: CurrencyDisplayProps
    usedCollateral: CurrencyDisplayProps
    initialAllowance: CurrencyDisplayProps
    remainingAllowance: CurrencyDisplayProps
    totalCollateral: CurrencyDisplayProps
    spendSectorRoots: CurrencyDisplayProps
    spendAppendSector: CurrencyDisplayProps
    spendFreeSector: CurrencyDisplayProps
    spendFundAccount: CurrencyDisplayProps
    countryFlag: string
    countryName: string
    formation: string
    proofHeight: string
    expirationHeight: string
    nextPrune: string
    lastBroadcastAttempt: string
    capacity: string
    dataSize: string
    renewedFrom: string
    renewedTo: string
    revisionNumber: string
  }
}
