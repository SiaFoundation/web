import {
  AutopilotConfig,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import {
  toHastings,
  weeksToBlocks,
  TBToBytes,
  valuePerTBPerMonthToPerBytePerBlock,
  valuePerMonthToPerPeriod,
  valuePerMillionToPerOne,
  valuePerTBToPerByte,
  minutesInMilliseconds,
  daysInMilliseconds,
} from '@siafoundation/units'
import {
  getAdvancedDefaultsAutopilot,
  getAdvancedDefaultsUpload,
  ValuesPinned,
  ValuesUpload,
  ValuesAutopilot,
  ValuesGouging,
  SubmitValuesAutopilot,
  SubmitValuesGouging,
  getAdvancedDefaultsGouging,
  getAdvancedDefaultsPinned,
  SubmitValuesPinned,
  SubmitValuesUpload,
  SubmitValues,
} from './types'
import { ResourcesRequiredLoaded } from './useResources'
import BigNumber from 'bignumber.js'
import { objectEntries } from '@siafoundation/design-system'

// up
export function transformUpAutopilot(
  network: 'mainnet' | 'zen' | 'anagami',
  values: SubmitValuesAutopilot,
  existingValues: AutopilotConfig,
): AutopilotConfig {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsAutopilot(network),
  ) as ValuesAutopilot

  return {
    ...existingValues,
    contracts: {
      ...existingValues?.contracts,
      amount: Math.round(v.amountHosts.toNumber()),
      period: Math.round(weeksToBlocks(v.periodWeeks.toNumber())),
      renewWindow: Math.round(weeksToBlocks(v.renewWindowWeeks.toNumber())),
      download: Number(
        valuePerMonthToPerPeriod(
          TBToBytes(v.downloadTBMonth),
          v.periodWeeks,
        ).toFixed(0),
      ),
      upload: Number(
        valuePerMonthToPerPeriod(
          TBToBytes(v.uploadTBMonth),
          v.periodWeeks,
        ).toFixed(0),
      ),
      storage: TBToBytes(v.storageTB).toNumber(),
      prune: v.prune,
    },
    hosts: {
      ...existingValues?.hosts,
      maxDowntimeHours: v.maxDowntimeHours.toNumber(),
      maxConsecutiveScanFailures: v.maxConsecutiveScanFailures.toNumber(),
      scoreOverrides: existingValues?.hosts.scoreOverrides || {},
      minProtocolVersion: v.minProtocolVersion,
    },
  }
}

export function transformUpGouging(
  values: SubmitValuesGouging,
  existingValues: SettingsGouging,
): SettingsGouging {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsGouging(),
  ) as ValuesGouging
  return {
    ...existingValues,
    maxRPCPrice: toHastings(
      valuePerMillionToPerOne(v.maxRPCPriceMillion),
    ).toString(),
    maxStoragePrice: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(v.maxStoragePriceTBMonth),
    ).toString(),
    maxUploadPrice: toHastings(
      valuePerTBToPerByte(v.maxUploadPriceTB),
    ).toString(),
    maxDownloadPrice: toHastings(
      valuePerTBToPerByte(v.maxDownloadPriceTB),
    ).toString(),
    maxContractPrice: toHastings(v.maxContractPrice).toString(),
    hostBlockHeightLeeway: Math.round(v.hostBlockHeightLeeway.toNumber() || 0),
    minPriceTableValidity: Math.round(
      minutesInMilliseconds(v.minPriceTableValidityMinutes.toNumber() || 0),
    ),
    minAccountExpiry: Math.round(
      daysInMilliseconds(v.minAccountExpiryDays.toNumber()),
    ),
    minMaxEphemeralAccountBalance: toHastings(
      v.minMaxEphemeralAccountBalance,
    ).toString(),
  }
}

export function transformUpPinned(
  values: SubmitValuesPinned & { periodWeeks?: BigNumber },
  existingValues: SettingsPinned,
): SettingsPinned {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsPinned(),
  ) as ValuesPinned & { periodWeeks: BigNumber }
  return {
    ...existingValues,
    currency: v.pinnedCurrency,
    threshold: v.pinnedThreshold.div(100).toNumber(),
    gougingSettingsPins: {
      maxStorage: {
        pinned: v.shouldPinMaxStoragePrice,
        value: v.maxStoragePriceTBMonthPinned.toNumber(),
      },
      maxDownload: {
        pinned: v.shouldPinMaxDownloadPrice,
        value: v.maxDownloadPriceTBPinned.toNumber(),
      },
      maxUpload: {
        pinned: v.shouldPinMaxUploadPrice,
        value: v.maxUploadPriceTBPinned.toNumber(),
      },
    },
  }
}

export function transformUpUpload(
  values: SubmitValuesUpload,
  existingValues: SettingsUpload,
): SettingsUpload {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsUpload('mainnet'),
  ) as ValuesUpload
  return {
    ...existingValues,
    packing: {
      ...existingValues.packing,
      enabled: v.uploadPackingEnabled,
    },
    redundancy: {
      ...existingValues.redundancy,
      minShards: v.minShards.toNumber(),
      totalShards: v.totalShards.toNumber(),
    },
  }
}

export function transformUp({
  resources,
  renterdState,
  values,
}: {
  resources: ResourcesRequiredLoaded
  renterdState: { network: 'mainnet' | 'zen' | 'anagami' }
  values: SubmitValues
}) {
  const autopilot = transformUpAutopilot(
    renterdState.network,
    values,
    resources.autopilot.data,
  )
  const gouging = transformUpGouging(values, resources.gouging.data)
  const pinned = transformUpPinned(values, resources.pinned.data)
  const upload = transformUpUpload(values, resources.upload.data)

  return {
    payloads: {
      autopilot,
      gouging,
      pinned,
      upload,
    },
  }
}

function applyDefaultToAnyEmptyValues<Values extends Record<string, unknown>>(
  values: Values,
  defaults: Partial<Values>,
) {
  const merged = { ...values }
  objectEntries(merged).forEach(([key, value]) => {
    const defaultValue = defaults[key]
    if (defaultValue) {
      if (value === undefined || value === null || value === '') {
        merged[key] = defaultValue
      }
    }
  })
  return merged
}
