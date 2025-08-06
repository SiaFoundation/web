import { Contract } from '@siafoundation/indexd-types'
import { HostData } from '../Hosts/types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { CurrencyDisplayProps } from '@siafoundation/design-system'

export type ContractData = Contract & {
  id: string
  host?: HostData
  exchange?: {
    currency: CurrencyOption
    rate: BigNumber
  }
  sortingFields: {
    spending: {
      appendSector: BigNumber
      freeSector: BigNumber
      fundAccount: BigNumber
      sectorRoots: BigNumber
    }
    remainingAllowance: BigNumber
    totalCollateral: BigNumber
    contractPrice: BigNumber
    minerFee: BigNumber
    usedCollateral: BigNumber
    initialAllowance: BigNumber
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
