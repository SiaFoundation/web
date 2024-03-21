import {
  daysInNanoseconds,
  minutesInNanoseconds,
  nanosecondsInDays,
  nanosecondsInMinutes,
  toFixedMax,
} from '@siafoundation/design-system'
import {
  AutopilotConfig,
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/react-renterd'
import {
  toHastings,
  toSiacoins,
  blocksToWeeks,
  bytesToTB,
  weeksToBlocks,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import {
  AutopilotData,
  scDecimalPlaces,
  SettingsData,
  getAdvancedDefaultAutopilot,
  ContractSetData,
  defaultContractSet,
  GougingData,
  RedundancyData,
  UploadPackingData,
  defaultAutopilot,
  advancedDefaultContractSet,
} from './types'
import { firstTimeGougingData } from './resources'

const filterUndefinedKeys = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== undefined && value !== ''
    )
  )
}

// up
export function transformUpAutopilot(
  network: 'Mainnet' | 'Zen Testnet',
  values: AutopilotData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: AutopilotConfig | undefined
): AutopilotConfig {
  // merge suggestions with values, if advanced values are required they will
  // be added before this function is called and will override suggestions
  const v: AutopilotData = {
    ...getAdvancedDefaultAutopilot(network),
    ...filterUndefinedKeys(values),
  }

  return {
    ...existingValues,
    contracts: {
      ...existingValues?.contracts,
      set: v.autopilotContractSet,
      amount: Math.round(v.amountHosts.toNumber()),
      allowance: toHastings(
        valuePerMonthToPerPeriod(v.allowanceMonth, v.periodWeeks)
      ).toString(),
      period: Math.round(weeksToBlocks(v.periodWeeks.toNumber())),
      renewWindow: Math.round(weeksToBlocks(v.renewWindowWeeks.toNumber())),
      download: Number(
        valuePerMonthToPerPeriod(
          TBToBytes(v.downloadTBMonth),
          v.periodWeeks
        ).toFixed(0)
      ),
      upload: Number(
        valuePerMonthToPerPeriod(
          TBToBytes(v.uploadTBMonth),
          v.periodWeeks
        ).toFixed(0)
      ),
      storage: TBToBytes(v.storageTB).toNumber(),
      prune: v.prune,
    },
    hosts: {
      ...existingValues?.hosts,
      maxDowntimeHours: v.maxDowntimeHours.toNumber(),
      minRecentScanFailures: v.minRecentScanFailures.toNumber(),
      allowRedundantIPs: v.allowRedundantIPs,
      scoreOverrides: existingValues?.hosts.scoreOverrides || null,
    },
  }
}

export function transformUpContractSet(
  values: ContractSetData,
  existingValues: ContractSetSettings | undefined
): ContractSetSettings {
  const _default =
    values.defaultContractSet ||
    (existingValues?.default as string) ||
    advancedDefaultContractSet.defaultContractSet
  return {
    ...existingValues,
    default: _default,
  }
}

export function transformUpUploadPacking(
  values: UploadPackingData,
  existingValues: UploadPackingSettings
): UploadPackingSettings {
  return {
    ...existingValues,
    enabled: values.uploadPackingEnabled,
  }
}

export function transformUpGouging(
  values: SettingsData,
  existingValues: GougingSettings
): GougingSettings {
  return {
    ...existingValues,
    maxRPCPrice: toHastings(
      values.maxRpcPriceMillion.div(1_000_000)
    ).toString(),
    maxStoragePrice: toHastings(
      values.maxStoragePriceTBMonth // TB/month
        .div(monthsToBlocks(1)) // TB/block
        .div(TBToBytes(1))
    ).toString(),
    maxUploadPrice: toHastings(values.maxUploadPriceTB).toString(),
    maxDownloadPrice: toHastings(values.maxDownloadPriceTB).toString(),
    maxContractPrice: toHastings(values.maxContractPrice).toString(),
    hostBlockHeightLeeway: Math.round(values.hostBlockHeightLeeway.toNumber()),
    minPriceTableValidity: Math.round(
      minutesInNanoseconds(values.minPriceTableValidityMinutes.toNumber())
    ),
    minAccountExpiry: Math.round(
      daysInNanoseconds(values.minAccountExpiryDays.toNumber())
    ),
    minMaxEphemeralAccountBalance: toHastings(
      values.minMaxEphemeralAccountBalance
    ).toString(),
    migrationSurchargeMultiplier:
      values.migrationSurchargeMultiplier.toNumber(),
  }
}

export function transformUpRedundancy(
  values: RedundancyData,
  existingValues: RedundancySettings
): RedundancySettings {
  return {
    ...existingValues,
    minShards: values.minShards.toNumber(),
    totalShards: values.totalShards.toNumber(),
  }
}

// down
export function transformDownAutopilot(
  config?: AutopilotConfig
): AutopilotData {
  if (!config) {
    return defaultAutopilot
  }

  const autopilotContractSet = config.contracts.set
  const allowanceMonth = toSiacoins(
    valuePerPeriodToPerMonth(
      new BigNumber(config.contracts.allowance),
      config.contracts.period
    ),
    scDecimalPlaces
  )
  const amountHosts = new BigNumber(config.contracts.amount)
  const periodWeeks = new BigNumber(blocksToWeeks(config.contracts.period))
  const renewWindowWeeks = new BigNumber(
    blocksToWeeks(config.contracts.renewWindow)
  )
  const downloadTBMonth = new BigNumber(
    toFixedMax(
      valuePerPeriodToPerMonth(
        bytesToTB(config.contracts.download),
        config.contracts.period
      ),
      2
    )
  )
  const uploadTBMonth = new BigNumber(
    toFixedMax(
      valuePerPeriodToPerMonth(
        bytesToTB(config.contracts.upload),
        config.contracts.period
      ),
      2
    )
  )
  const storageTB = bytesToTB(new BigNumber(config.contracts.storage))
  const prune = config.contracts.prune

  return {
    // contracts
    autopilotContractSet,
    allowanceMonth,
    amountHosts,
    periodWeeks,
    renewWindowWeeks,
    downloadTBMonth,
    uploadTBMonth,
    storageTB,
    prune,
    // hosts
    allowRedundantIPs: config.hosts.allowRedundantIPs,
    maxDowntimeHours: new BigNumber(config.hosts.maxDowntimeHours),
    minRecentScanFailures: new BigNumber(config.hosts.minRecentScanFailures),
  }
}

export function transformDownContractSet(
  c?: ContractSetSettings
): ContractSetData {
  if (!c) {
    return defaultContractSet
  }
  return {
    defaultContractSet: c.default,
  }
}

export function transformDownUploadPacking(
  u: UploadPackingSettings
): UploadPackingData {
  return {
    uploadPackingEnabled: u.enabled,
  }
}

export function transformDownGouging({
  gouging: _gouging,
  averages,
  hasBeenConfigured,
}: {
  gouging: GougingSettings
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
  hasBeenConfigured: boolean
}): GougingData {
  const gouging = firstTimeGougingData({
    gouging: _gouging,
    averages,
    hasBeenConfigured,
  })

  return {
    maxStoragePriceTBMonth: toSiacoins(
      new BigNumber(gouging.maxStoragePrice) // bytes/block
        .times(monthsToBlocks(1)) // bytes/month
        .times(TBToBytes(1)), // tb/month
      scDecimalPlaces
    ), // TB/month
    maxUploadPriceTB: toSiacoins(
      new BigNumber(gouging.maxUploadPrice),
      scDecimalPlaces
    ),
    maxDownloadPriceTB: toSiacoins(gouging.maxDownloadPrice, scDecimalPlaces),
    maxContractPrice: toSiacoins(gouging.maxContractPrice, scDecimalPlaces),
    maxRpcPriceMillion: toSiacoins(
      new BigNumber(gouging.maxRPCPrice).times(1_000_000),
      scDecimalPlaces
    ),
    hostBlockHeightLeeway: new BigNumber(gouging.hostBlockHeightLeeway),
    minPriceTableValidityMinutes: new BigNumber(
      nanosecondsInMinutes(gouging.minPriceTableValidity)
    ),
    minAccountExpiryDays: new BigNumber(
      nanosecondsInDays(gouging.minAccountExpiry)
    ),
    minMaxEphemeralAccountBalance: toSiacoins(
      gouging.minMaxEphemeralAccountBalance,
      scDecimalPlaces
    ),
    migrationSurchargeMultiplier: new BigNumber(
      gouging.migrationSurchargeMultiplier
    ),
  }
}

export function transformDownRedundancy(r: RedundancySettings): RedundancyData {
  return {
    minShards: new BigNumber(r.minShards),
    totalShards: new BigNumber(r.totalShards),
  }
}

export type RemoteData = {
  hasBeenConfigured: boolean
  autopilot: AutopilotConfig | undefined
  contractSet: ContractSetSettings | undefined
  uploadPacking: UploadPackingSettings
  gouging: GougingSettings
  redundancy: RedundancySettings
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
}

export function transformDown({
  hasBeenConfigured,
  autopilot,
  contractSet,
  uploadPacking,
  gouging,
  redundancy,
  averages,
}: RemoteData): SettingsData {
  return {
    // autopilot
    ...transformDownAutopilot(autopilot),
    // contractset
    ...transformDownContractSet(contractSet),
    // uploadpacking
    ...transformDownUploadPacking(uploadPacking),
    // gouging
    ...transformDownGouging({
      gouging,
      averages,
      hasBeenConfigured,
    }),
    // redundancy
    ...transformDownRedundancy(redundancy),
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

export function storagePricePerMonthToPerBlock(value: BigNumber) {
  return value // TB/month
    .div(monthsToBlocks(1)) // TB/block
    .div(TBToBytes(1)) // bytes/block
}

export function valuePerMonthToPerPeriod(
  valuePerMonth: BigNumber,
  periodWeeks: BigNumber
) {
  const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
  return valuePerMonth.times(periodBlocks).div(monthsToBlocks(1))
}

export function valuePerPeriodToPerMonth(
  valuePerPeriod: BigNumber,
  periodBlocks: number
) {
  const valuePerBlock = valuePerPeriod.div(periodBlocks)
  return valuePerBlock.times(monthsToBlocks(1))
}
