import {
  MaintenanceSettings,
  UsabilitySettings,
  PinnedSettings,
} from '@siafoundation/indexd-types'
import {
  blocksToWeeks,
  toSiacoins,
  valuePerBytePerBlockToPerTBPerMonth,
  valuePerByteToPerTB,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import {
  InputValues,
  scDecimalPlaces,
  InputValuesContracts,
  InputValuesHosts,
  InputValuesPricePinning,
} from './types'
import { CurrencyId } from '@siafoundation/react-core'

// down
export function transformDownContracts(
  config: MaintenanceSettings,
): InputValuesContracts {
  const periodWeeks = new BigNumber(blocksToWeeks(config.period))
  const renewWindowWeeks = new BigNumber(blocksToWeeks(config.renewWindow))
  const wantedContracts = new BigNumber(config.wantedContracts)

  return {
    periodWeeks,
    renewWindowWeeks,
    wantedContracts,
  }
}

export function transformDownHosts(
  config: UsabilitySettings,
): InputValuesHosts {
  return {
    maxStoragePriceTBMonth: toSiacoins(
      valuePerBytePerBlockToPerTBPerMonth(
        new BigNumber(config.maxStoragePrice),
      ),
      scDecimalPlaces,
    ), // TB/month
    maxIngressPriceTB: toSiacoins(
      valuePerByteToPerTB(new BigNumber(config.maxIngressPrice)),
      scDecimalPlaces,
    ),
    maxEgressPriceTB: toSiacoins(
      valuePerByteToPerTB(new BigNumber(config.maxEgressPrice)),
      scDecimalPlaces,
    ),
    minCollateral: toSiacoins(
      valuePerBytePerBlockToPerTBPerMonth(new BigNumber(config.minCollateral)),
      scDecimalPlaces,
    ),
    minProtocolVersion: config.minProtocolVersion.slice(
      1,
    ) as `${number}.${number}.${number}`,
  }
}

export function transformDownPricePinning(
  p: PinnedSettings,
): InputValuesPricePinning {
  return {
    pinnedCurrency: p.currency as CurrencyId,
    shouldPinMaxStoragePrice: !!p.maxStoragePrice,
    maxStoragePriceTBMonthPinned: new BigNumber(p.maxStoragePrice),
    shouldPinMaxIngressPrice: !!p.maxIngressPrice,
    maxIngressPriceTBPinned: new BigNumber(p.maxIngressPrice),
    shouldPinMaxEgressPrice: !!p.maxEgressPrice,
    maxEgressPriceTBPinned: new BigNumber(p.maxEgressPrice),
    shouldPinMinCollateral: !!p.minCollateral,
    minCollateralPinned: new BigNumber(p.minCollateral),
  }
}

export type RemoteData = {
  contracts: MaintenanceSettings
  hosts: UsabilitySettings
  pricePinning: PinnedSettings
}

export function transformDown({
  contracts,
  hosts,
  pricePinning,
}: RemoteData): InputValues {
  return {
    // contracts
    ...transformDownContracts(contracts),
    // hosts
    ...transformDownHosts(hosts),
    // pinning
    ...transformDownPricePinning(pricePinning),
  }
}
