import { AdminContractsSortBy, Contract } from '@siafoundation/indexd-types'
import { truncate } from '@siafoundation/design-system'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import {
  CurrencyDisplayProps,
  DataTableSortColumn,
  DataTableState,
} from '@siafoundation/design-system'

export type ContractFilterStatus = {
  id: 'status'
  value: boolean
}

export type ContractFilterRevisable = {
  id: 'revisable'
  value: boolean
}

export type ContractFilterPublicKey = {
  id: 'hostkey'
  value: string
}

export type ContractFilter =
  | ContractFilterStatus
  | ContractFilterRevisable
  | ContractFilterPublicKey
export type ContractFilters = ContractFilter[]

export type ContractSorts = DataTableSortColumn<AdminContractsSortBy>[]

export function getFilterLabel(filter: ContractFilter): string {
  if (filter.id === 'status') {
    return filter.value ? 'Status is good' : 'Status is bad'
  }
  if (filter.id === 'revisable') {
    return filter.value ? 'Revisable' : 'Not revisable'
  }
  if (filter.id === 'hostkey') {
    return `Public key is ${truncate(filter.value, 20)}`
  }
  return ''
}

export type ContractData = Contract & {
  id: string
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
    formation: string
    proofHeight: string
    expirationHeight: string
    nextPrune: string
    lastBroadcastAttempt: string
    capacity: string
    dataSize: string
    renewedFrom: string | null
    renewedTo: string | null
    revisionNumber: string
  }
}

export type ContractDataTableState = DataTableState<
  ContractData,
  ContractFilters,
  ContractSorts
>
