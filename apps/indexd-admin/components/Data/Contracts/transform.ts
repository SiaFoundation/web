import { ContractData } from './types'
import { BigNumber } from 'bignumber.js'
import {
  CurrencyDisplayPreference,
  CurrencyOption,
} from '@siafoundation/react-core'
import { Contract } from '@siafoundation/indexd-types'
import {
  countryCodeEmoji,
  getCountryName,
  humanBytes,
} from '@siafoundation/units'
import { getCurrencyDisplayPropsPreferred } from '@siafoundation/design-system'
import { V2HostSettings } from '@siafoundation/types'

export function transformContract(
  contract: Contract,
  {
    host,
    exchange,
    currencyDisplay,
  }: {
    host?: {
      location: {
        countryCode: string
        latitude: number
        longitude: number
      }
      v2Settings?: V2HostSettings
    }
    currencyDisplay: CurrencyDisplayPreference
    exchange: { currency: CurrencyOption; rate: BigNumber } | undefined
  },
): ContractData {
  const datum: ContractData = {
    ...contract,
    id: contract.id,
    host,
    exchange,
    displayFields: transformContractDisplayFields(
      contract,
      host?.location,
      currencyDisplay,
      exchange,
    ),
  }
  return datum
}

function transformContractDisplayFields(
  contract: Contract,
  location:
    | { countryCode: string; latitude: number; longitude: number }
    | undefined,
  currencyDisplay: CurrencyDisplayPreference,
  exchange: { currency: CurrencyOption; rate: BigNumber } | undefined,
) {
  return {
    contractPrice: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.contractPrice),
      currencyDisplay,
      exchange,
    }),
    minerFee: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.minerFee),
      currencyDisplay,
      exchange,
    }),
    usedCollateral: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.usedCollateral),
      currencyDisplay,
      exchange,
    }),
    initialAllowance: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.initialAllowance),
      currencyDisplay,
      exchange,
    }),
    remainingAllowance: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.remainingAllowance),
      currencyDisplay,
      exchange,
    }),
    totalCollateral: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.totalCollateral),
      currencyDisplay,
      exchange,
    }),
    spendSectorRoots: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.spending.sectorRoots),
      currencyDisplay,
      exchange,
    }),
    spendAppendSector: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.spending.appendSector),
      currencyDisplay,
      exchange,
    }),
    spendFreeSector: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.spending.freeSector),
      currencyDisplay,
      exchange,
    }),
    spendFundAccount: getCurrencyDisplayPropsPreferred({
      sc: new BigNumber(contract.spending.fundAccount),
      currencyDisplay,
      exchange,
    }),
    countryFlag: countryCodeEmoji(location?.countryCode),
    countryName: getCountryName(location?.countryCode),
    formation: Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(contract.formation)),
    proofHeight: contract.proofHeight.toLocaleString(),
    expirationHeight: contract.expirationHeight.toLocaleString(),
    nextPrune: Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(contract.nextPrune)),
    lastBroadcastAttempt: Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(contract.lastBroadcastAttempt)),
    capacity: humanBytes(contract.size),
    dataSize: humanBytes(contract.capacity),
    renewedFrom:
      contract.renewedFrom ===
      '0000000000000000000000000000000000000000000000000000000000000000'
        ? '-'
        : contract.renewedFrom,
    renewedTo:
      contract.renewedTo ===
      '0000000000000000000000000000000000000000000000000000000000000000'
        ? '-'
        : contract.renewedTo,
    revisionNumber: contract.revisionNumber.toLocaleString(),
  }
}
