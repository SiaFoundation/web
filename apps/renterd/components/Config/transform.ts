import {
  daysInNanoseconds,
  minutesInNanoseconds,
  monthsToBlocks,
  nanosecondsInDays,
  nanosecondsInMinutes,
  TBToBytes,
} from '@siafoundation/design-system'
import {
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/react-renterd'
import { toHastings, toSiacoins } from '@siafoundation/sia-js'
import { ConfigDisplayOptions } from '../../hooks/useConfigDisplayOptions'
import BigNumber from 'bignumber.js'
import {
  ConfigAppData,
  ContractSetData,
  defaultConfigApp,
  defaultContractSet,
  GougingData,
  RedundancyData,
  scDecimalPlaces,
  SettingsData,
  UploadPackingData,
} from './fields'

// up

export function transformUpContractSet(
  values: ContractSetData,
  existingValues: Record<string, unknown>
): ContractSetSettings {
  return {
    ...existingValues,
    default: values.contractSet,
  }
}

export function transformUpUploadPacking(
  values: UploadPackingData,
  existingValues: Record<string, unknown>
): UploadPackingSettings {
  return {
    ...existingValues,
    enabled: values.uploadPackingEnabled,
  }
}

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
        .div(TBToBytes(1))
        .div(
          getRedundancyMultiplierIfIncluded(
            values.minShards,
            values.totalShards,
            values.includeRedundancyMaxStoragePrice
          )
        ) // bytes/block
    ).toString(),
    maxUploadPrice: toHastings(
      values.maxUploadPrice.div(
        getRedundancyMultiplierIfIncluded(
          values.minShards,
          values.totalShards,
          values.includeRedundancyMaxUploadPrice
        )
      )
    ).toString(),
    maxDownloadPrice: toHastings(values.maxDownloadPrice).toString(),
    maxContractPrice: toHastings(values.maxContractPrice).toString(),
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
  values: RedundancyData,
  existingValues: Record<string, unknown>
): RedundancySettings {
  return {
    ...existingValues,
    minShards: values.minShards.toNumber(),
    totalShards: values.totalShards.toNumber(),
  }
}

export function transformUpConfigApp(
  values: ConfigAppData,
  existingValues: Record<string, unknown>
): ConfigDisplayOptions {
  return {
    ...existingValues,
    includeRedundancyMaxStoragePrice: values.includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice: values.includeRedundancyMaxUploadPrice,
  }
}

// down

export function transformDownContractSet(
  c?: ContractSetSettings
): ContractSetData {
  if (!c) {
    return defaultContractSet
  }
  return {
    contractSet: c.default,
  }
}

export function transformDownUploadPacking(
  u: UploadPackingSettings
): UploadPackingData {
  return {
    uploadPackingEnabled: u.enabled,
  }
}

export function transformDownConfigApp(
  ca?: ConfigDisplayOptions
): ConfigAppData {
  if (!ca) {
    return defaultConfigApp
  }
  return {
    includeRedundancyMaxStoragePrice: ca.includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice: ca.includeRedundancyMaxUploadPrice,
  }
}

export function transformDownGouging(
  g: GougingSettings,
  r: RedundancyData,
  ca: ConfigAppData
): GougingData {
  return {
    maxStoragePrice: toSiacoins(
      new BigNumber(g.maxStoragePrice) // bytes/block
        .times(monthsToBlocks(1)) // bytes/month
        .times(TBToBytes(1)) // tb/month
        .times(
          getRedundancyMultiplierIfIncluded(
            r.minShards,
            r.totalShards,
            ca.includeRedundancyMaxStoragePrice
          )
        ),
      scDecimalPlaces
    ), // TB/month
    maxUploadPrice: toSiacoins(
      new BigNumber(g.maxUploadPrice).times(
        getRedundancyMultiplierIfIncluded(
          r.minShards,
          r.totalShards,
          ca.includeRedundancyMaxUploadPrice
        )
      ),
      scDecimalPlaces
    ),
    maxDownloadPrice: toSiacoins(g.maxDownloadPrice, scDecimalPlaces),
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
  }
}

export function transformDownRedundancy(r: RedundancySettings): RedundancyData {
  return {
    minShards: new BigNumber(r.minShards),
    totalShards: new BigNumber(r.totalShards),
  }
}

export function transformDown(
  c: ContractSetSettings | undefined,
  u: UploadPackingSettings,
  g: GougingSettings,
  r: RedundancySettings,
  ca: ConfigDisplayOptions | undefined
): SettingsData {
  const configApp = transformDownConfigApp(ca)
  const redundancy = transformDownRedundancy(r)
  return {
    // contractset
    ...transformDownContractSet(c),
    // uploadpacking
    ...transformDownUploadPacking(u),
    // gouging
    ...transformDownGouging(g, redundancy, configApp),
    // redundancy
    ...redundancy,
    // config app
    ...configApp,
  }
}

export function getRedundancyMultiplier(
  minShards: BigNumber,
  totalShards: BigNumber
): BigNumber {
  let redundancyMult = new BigNumber(1)
  const canCalcRedundancy =
    minShards &&
    totalShards &&
    !minShards.isZero() &&
    !totalShards.isZero() &&
    totalShards.gte(minShards)
  if (canCalcRedundancy) {
    redundancyMult = totalShards.div(minShards)
  }
  return redundancyMult
}

export function getRedundancyMultiplierIfIncluded(
  minShards: BigNumber,
  totalShards: BigNumber,
  includeRedundancy: boolean
): BigNumber {
  const redundancyMult = getRedundancyMultiplier(minShards, totalShards)
  return includeRedundancy ? redundancyMult : new BigNumber(1)
}
