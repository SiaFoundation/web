import {
  daysInNanoseconds,
  minutesInNanoseconds,
  monthsToBlocks,
  nanosecondsInDays,
  nanosecondsInMinutes,
  TBToBytes,
} from '@siafoundation/design-system'
import {
  GougingSettings,
  RedundancySettings,
} from '@siafoundation/react-renterd'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { scDecimalPlaces, SettingsData } from './fields'

export function transformUpGouging(
  values: SettingsData,
  existingValues: Record<string, unknown>
): GougingSettings {
  return {
    ...existingValues,
    maxRPCPrice: toHastings(values.maxRpcPrice.div(1_000_000)).toString(),
    maxStoragePrice: toHastings(
      values.maxStoragePrice // TB/month
        .div(monthsToBlocks(1)) // TB/block
        .div(TBToBytes(1)) // bytes/block
    ).toString(),
    maxContractPrice: toHastings(values.maxContractPrice).toString(),
    maxDownloadPrice: toHastings(values.maxDownloadPrice).toString(),
    maxUploadPrice: toHastings(values.maxUploadPrice).toString(),
    minMaxCollateral: toHastings(values.minMaxCollateral).toString(),
    hostBlockHeightLeeway: Math.round(values.hostBlockHeightLeeway.toNumber()),
    minPriceTableValidity: Math.round(
      minutesInNanoseconds(values.minPriceTableValidity.toNumber())
    ),
    minAccountExpiry: Math.round(
      daysInNanoseconds(values.minAccountExpiry.toNumber())
    ),
    minMaxEphemeralAccountBalance: toHastings(
      values.minMaxEphemeralAccountBalance
    ).toString(),
  }
}

export function transformUpRedundancy(
  values: Pick<SettingsData, 'minShards' | 'totalShards'>,
  existingValues: Record<string, unknown>
): RedundancySettings {
  return {
    ...existingValues,
    minShards: values.minShards.toNumber(),
    totalShards: values.totalShards.toNumber(),
  }
}

export function transformDown(
  g: GougingSettings,
  r: RedundancySettings
): SettingsData {
  return {
    // gouging
    maxStoragePrice: toSiacoins(
      new BigNumber(g.maxStoragePrice) // bytes/block
        .times(monthsToBlocks(1)) // bytes/month
        .times(TBToBytes(1)),
      scDecimalPlaces
    ), // TB/month
    maxDownloadPrice: toSiacoins(g.maxDownloadPrice, scDecimalPlaces),
    maxUploadPrice: toSiacoins(g.maxUploadPrice, scDecimalPlaces),
    maxContractPrice: toSiacoins(g.maxContractPrice, scDecimalPlaces),
    maxRpcPrice: toSiacoins(g.maxRPCPrice, scDecimalPlaces).times(1_000_000),
    minMaxCollateral: toSiacoins(g.minMaxCollateral, scDecimalPlaces),
    hostBlockHeightLeeway: new BigNumber(g.hostBlockHeightLeeway),
    minPriceTableValidity: new BigNumber(
      nanosecondsInMinutes(g.minPriceTableValidity)
    ),
    minAccountExpiry: new BigNumber(nanosecondsInDays(g.minAccountExpiry)),
    minMaxEphemeralAccountBalance: toSiacoins(
      g.minMaxEphemeralAccountBalance,
      scDecimalPlaces
    ),

    // redundancy
    minShards: new BigNumber(r.minShards),
    totalShards: new BigNumber(r.totalShards),
  }
}
