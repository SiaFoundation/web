import { ContractData } from './types'
import { BigNumber } from 'bignumber.js'
import { transformHost } from '../Hosts/transform'
import { CurrencyOption } from '@siafoundation/react-core'
import { Contract, Host } from '@siafoundation/indexd-types'

export function transformContract(
  contract: Contract,
  {
    geo,
    host,
    exchange,
  }: {
    host?: Host
    geo?: {
      publicKey: string
      location: { countryCode: string; latitude: number; longitude: number }
    }[]
    exchange: { currency: CurrencyOption; rate: BigNumber }
  },
): ContractData {
  const datum: ContractData = {
    ...contract,
    id: contract.id,
    host: host ? transformHost(host, { geo, exchange }) : undefined,
    exchange,
    sortingFields: {
      spending: {
        appendSector: new BigNumber(contract.spending.appendSector),
        freeSector: new BigNumber(contract.spending.freeSector),
        fundAccount: new BigNumber(contract.spending.fundAccount),
        sectorRoots: new BigNumber(contract.spending.sectorRoots),
      },
      remainingAllowance: new BigNumber(contract.remainingAllowance),
      totalCollateral: new BigNumber(contract.totalCollateral),
      contractPrice: new BigNumber(contract.contractPrice),
      minerFee: new BigNumber(contract.minerFee),
      usedCollateral: new BigNumber(contract.usedCollateral),
      initialAllowance: new BigNumber(contract.initialAllowance),
    },
  }
  return datum
}
