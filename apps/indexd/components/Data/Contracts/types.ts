import { Contract } from '@siafoundation/indexd-types'
import { HostData } from '../Hosts/types'
import { CurrencyOption } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

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
}
