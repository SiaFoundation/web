import { Contract } from '@siafoundation/indexd-types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { CurrencyDisplayProps } from '@siafoundation/design-system'
import { V2HostSettings } from '@siafoundation/types'

export type ContractFilters = (
  | {
      id: 'status'
      value: boolean
    }
  | {
      id: 'revisable'
      value: boolean
    }
)[]

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
