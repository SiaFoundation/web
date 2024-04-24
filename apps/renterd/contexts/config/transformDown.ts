import {
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
} from '@siafoundation/renterd-types'
import {
  toSiacoins,
  blocksToWeeks,
  bytesToTB,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import {
  AutopilotData,
  scDecimalPlaces,
  SettingsData,
  ContractSetData,
  defaultContractSet,
  GougingData,
  RedundancyData,
  UploadPackingData,
  defaultAutopilot,
} from './types'
import { firstTimeGougingData } from './resources'

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
    minProtocolVersion: config.hosts.minProtocolVersion || '',
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

function valuePerPeriodToPerMonth(
  valuePerPeriod: BigNumber,
  periodBlocks: number
) {
  const valuePerBlock = valuePerPeriod.div(periodBlocks)
  return valuePerBlock.times(monthsToBlocks(1))
}
