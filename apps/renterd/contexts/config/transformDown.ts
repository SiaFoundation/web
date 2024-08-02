import {
  nanosecondsInDays,
  nanosecondsInMinutes,
  toFixedMaxBigNumber,
  toFixedMaxString,
} from '@siafoundation/design-system'
import {
  AutopilotConfig,
  ContractSetSettings,
  GougingSettings,
  PricePinSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/renterd-types'
import {
  toSiacoins,
  blocksToWeeks,
  bytesToTB,
  valuePerBytePerBlockToPerTBPerMonth,
  valuePerPeriodToPerMonth,
  valuePerOneToPerMillion,
  valuePerByteToPerTB,
  weeksToBlocks,
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
  PricePinData,
} from './types'
import { firstTimeGougingData } from './resources'
import { currencyOptions } from '@siafoundation/react-core'

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
    toFixedMaxString(
      valuePerPeriodToPerMonth(
        bytesToTB(config.contracts.download),
        config.contracts.period
      ),
      2
    )
  )
  const uploadTBMonth = new BigNumber(
    toFixedMaxString(
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
      valuePerBytePerBlockToPerTBPerMonth(
        new BigNumber(gouging.maxStoragePrice)
      ),
      scDecimalPlaces
    ), // TB/month
    maxUploadPriceTB: toSiacoins(
      new BigNumber(gouging.maxUploadPrice),
      scDecimalPlaces
    ),
    maxDownloadPriceTB: toSiacoins(gouging.maxDownloadPrice, scDecimalPlaces),
    maxContractPrice: toSiacoins(gouging.maxContractPrice, scDecimalPlaces),
    maxRPCPriceMillion: toSiacoins(
      valuePerOneToPerMillion(new BigNumber(gouging.maxRPCPrice)),
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

export function transformDownPricePinning(
  p: PricePinSettings,
  periodBlocks?: number
): PricePinData {
  const fixedFiat = currencyOptions.find((c) => c.id === p.currency)?.fixed || 6
  return {
    pinningEnabled: p.enabled,
    pinnedCurrency: p.currency,
    forexEndpointURL: p.forexEndpointURL,
    pinnedThreshold: new BigNumber(p.threshold).times(100),
    shouldPinAllowance: p.autopilots?.allowance.pinned || false,
    allowanceMonthPinned: toFixedMaxBigNumber(
      valuePerPeriodToPerMonth(
        new BigNumber(p.autopilots?.allowance.value || 0),
        // If pinned allowance is non zero, the period value will be defined.
        periodBlocks || weeksToBlocks(6)
      ),
      fixedFiat
    ),
    shouldPinMaxRPCPrice: p.gougingSettingsPins?.maxRPCPrice.pinned,
    maxRPCPriceMillionPinned: toFixedMaxBigNumber(
      valuePerOneToPerMillion(
        new BigNumber(p.gougingSettingsPins.maxRPCPrice.value)
      ),
      fixedFiat
    ),
    shouldPinMaxStoragePrice: p.gougingSettingsPins?.maxStorage.pinned,
    maxStoragePriceTBMonthPinned: toFixedMaxBigNumber(
      valuePerBytePerBlockToPerTBPerMonth(
        new BigNumber(p.gougingSettingsPins.maxStorage.value)
      ),
      fixedFiat
    ),
    shouldPinMaxUploadPrice: p.gougingSettingsPins?.maxUpload.pinned,
    maxUploadPriceTBPinned: toFixedMaxBigNumber(
      valuePerByteToPerTB(new BigNumber(p.gougingSettingsPins.maxUpload.value)),
      fixedFiat
    ),
    shouldPinMaxDownloadPrice: p.gougingSettingsPins?.maxDownload.pinned,
    maxDownloadPriceTBPinned: toFixedMaxBigNumber(
      valuePerByteToPerTB(
        new BigNumber(p.gougingSettingsPins.maxDownload.value)
      ),
      fixedFiat
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
  pricePinning: PricePinSettings
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
  pricePinning,
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
    // price pinning
    ...transformDownPricePinning(pricePinning, autopilot?.contracts.period),
    // redundancy
    ...transformDownRedundancy(redundancy),
  }
}
