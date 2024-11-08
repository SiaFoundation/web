import { toFixedMaxString } from '@siafoundation/design-system'
import {
  AutopilotConfig,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import {
  blocksToWeeks,
  bytesToTB,
  nanosecondsInDays,
  nanosecondsInMinutes,
  toSiacoins,
  valuePerBytePerBlockToPerTBPerMonth,
  valuePerByteToPerTB,
  valuePerOneToPerMillion,
  valuePerPeriodToPerMonth,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import {
  InputValuesAutopilot,
  ValuesGouging,
  ValuesPinned,
  InputValues,
  ValuesUpload,
  inputValuesAutopilot,
  scDecimalPlaces,
} from './types'

// down
export function transformDownAutopilot(
  config?: AutopilotConfig
): InputValuesAutopilot {
  if (!config) {
    return inputValuesAutopilot
  }

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
    maxConsecutiveScanFailures: new BigNumber(
      config.hosts.maxConsecutiveScanFailures
    ),
    minProtocolVersion: config.hosts.minProtocolVersion || '',
  }
}

function firstTimeGougingData({
  gouging,
  averages,
  hasBeenConfigured,
}: {
  gouging: SettingsGouging
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
  hasBeenConfigured: boolean
}): SettingsGouging {
  // Already configured, the user has changed the defaults.
  if (hasBeenConfigured) {
    return gouging
  }
  // If sia central is disabled, we cant override with averages.
  if (!averages) {
    return gouging
  }
  return {
    ...gouging,
    maxStoragePrice: averages.settings.storage_price,
    maxDownloadPrice: new BigNumber(
      averages.settings.download_price
    ).toString(),
    maxUploadPrice: new BigNumber(averages.settings.upload_price).toString(),
  }
}

export function transformDownGouging({
  gouging: _gouging,
  averages,
  hasBeenConfigured,
}: {
  gouging: SettingsGouging
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
  hasBeenConfigured: boolean
}): ValuesGouging {
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
      valuePerByteToPerTB(new BigNumber(gouging.maxUploadPrice)),
      scDecimalPlaces
    ),
    maxDownloadPriceTB: toSiacoins(
      valuePerByteToPerTB(new BigNumber(gouging.maxDownloadPrice)),
      scDecimalPlaces
    ),
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

export function transformDownPinned(p: SettingsPinned): ValuesPinned {
  return {
    pinnedCurrency: p.currency,
    pinnedThreshold: new BigNumber(p.threshold).times(100),
    shouldPinMaxStoragePrice: p.gougingSettingsPins?.maxStorage.pinned,
    maxStoragePriceTBMonthPinned: new BigNumber(
      p.gougingSettingsPins.maxStorage.value
    ),
    shouldPinMaxUploadPrice: p.gougingSettingsPins?.maxUpload.pinned,
    maxUploadPriceTBPinned: new BigNumber(
      p.gougingSettingsPins.maxUpload.value
    ),
    shouldPinMaxDownloadPrice: p.gougingSettingsPins?.maxDownload.pinned,
    maxDownloadPriceTBPinned: new BigNumber(
      p.gougingSettingsPins.maxDownload.value
    ),
  }
}

export function transformDownUpload(u: SettingsUpload): ValuesUpload {
  return {
    uploadPackingEnabled: u.packing.enabled,
    minShards: new BigNumber(u.redundancy.minShards),
    totalShards: new BigNumber(u.redundancy.totalShards),
  }
}

export type RemoteData = {
  hasBeenConfigured: boolean
  autopilotID: string | undefined
  autopilot: AutopilotConfig | undefined
  gouging: SettingsGouging
  pinned: SettingsPinned
  upload: SettingsUpload
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
  autopilotID,
  autopilot,
  gouging,
  pinned,
  upload,
  averages,
}: RemoteData): InputValues {
  return {
    // autopilot
    ...transformDownAutopilot(autopilot),
    // gouging
    ...transformDownGouging({
      gouging,
      averages,
      hasBeenConfigured,
    }),
    // pinning
    ...transformDownPinned(pinned),
    // upload
    ...transformDownUpload(upload),
  }
}
