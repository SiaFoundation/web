import {
  MaintenanceSettings,
  UsabilitySettings,
  PinnedSettings,
} from '@siafoundation/indexd-types'
import {
  toHastings,
  weeksToBlocks,
  valuePerTBPerMonthToPerBytePerBlock,
  valuePerTBToPerByte,
} from '@siafoundation/units'
import {
  ValuesContracts,
  ValuesHosts,
  ValuesPricePinning,
  Values,
} from './types'
import { ResourcesRequiredLoaded } from './useResources'

// up
export function transformUpContracts(
  values: ValuesContracts,
  existingValues: MaintenanceSettings,
): MaintenanceSettings {
  return {
    ...existingValues,
    wantedContracts: Math.round(values.wantedContracts.toNumber()),
    period: Math.round(weeksToBlocks(values.periodWeeks.toNumber())),
    renewWindow: Math.round(weeksToBlocks(values.renewWindowWeeks.toNumber())),
  }
}

export function transformUpHosts(
  values: ValuesHosts,
  existingValues: UsabilitySettings,
): UsabilitySettings {
  return {
    ...existingValues,
    maxStoragePrice: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(values.maxStoragePriceTBMonth),
    ).toString(),
    maxIngressPrice: toHastings(
      valuePerTBToPerByte(values.maxIngressPriceTB),
    ).toString(),
    maxEgressPrice: toHastings(
      valuePerTBToPerByte(values.maxEgressPriceTB),
    ).toString(),
    minCollateral: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(values.minCollateral),
    ).toString(),
    minProtocolVersion: `v${values.minProtocolVersion}`,
  }
}

export function transformUpPinned(
  values: ValuesPricePinning,
  existingValues: PinnedSettings,
): PinnedSettings {
  return {
    ...existingValues,
    currency: values.pinnedCurrency,
    maxStoragePrice: values.shouldPinMaxStoragePrice
      ? values.maxStoragePriceTBMonthPinned.toNumber()
      : 0,
    maxEgressPrice: values.shouldPinMaxEgressPrice
      ? values.maxEgressPriceTBPinned.toNumber()
      : 0,
    maxIngressPrice: values.shouldPinMaxIngressPrice
      ? values.maxIngressPriceTBPinned.toNumber()
      : 0,
    minCollateral: values.shouldPinMinCollateral
      ? values.minCollateralPinned.toNumber()
      : 0,
  }
}

export function transformUp({
  resources,
  values,
}: {
  resources: ResourcesRequiredLoaded
  values: Values
}) {
  const contracts = transformUpContracts(values, resources.contracts.data)
  const hosts = transformUpHosts(values, resources.hosts.data)
  const pricePinning = transformUpPinned(values, resources.pricePinning.data)

  return {
    payloads: {
      contracts,
      hosts,
      pricePinning,
    },
  }
}
