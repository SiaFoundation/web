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
    maxDowntimeHours: new BigNumber(config.hosts.maxDowntimeHours),
    maxConsecutiveScanFailures: new BigNumber(
      config.hosts.maxConsecutiveScanFailures
    ),
    minProtocolVersion: config.hosts.minProtocolVersion || '',
  }
}

export function transformDownGouging({
  gouging,
}: {
  gouging: SettingsGouging
}): ValuesGouging {
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
  autopilot: AutopilotConfig
  gouging: SettingsGouging
  pinned: SettingsPinned
  upload: SettingsUpload
}

export function transformDown({
  autopilot,
  gouging,
  pinned,
  upload,
}: RemoteData): InputValues {
  return {
    // autopilot
    ...transformDownAutopilot(autopilot),
    // gouging
    ...transformDownGouging({
      gouging,
    }),
    // pinning
    ...transformDownPinned(pinned),
    // upload
    ...transformDownUpload(upload),
  }
}
