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
  daysInNanoseconds,
  minutesInNanoseconds,
  valuePerTBToPerByte,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: AutopilotConfig | undefined
): AutopilotConfig {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsAutopilot(network)
  ) as ValuesAutopilot

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
      maxConsecutiveScanFailures: v.maxConsecutiveScanFailures.toNumber(),
      allowRedundantIPs: v.allowRedundantIPs,
      scoreOverrides: existingValues?.hosts.scoreOverrides || {},
      minProtocolVersion: v.minProtocolVersion,
    },
  }
}

export function transformUpGouging(
  values: SubmitValuesGouging,
  existingValues: SettingsGouging
): SettingsGouging {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsGouging()
  ) as ValuesGouging
  return {
    ...existingValues,
    maxRPCPrice: toHastings(
      valuePerMillionToPerOne(v.maxRPCPriceMillion)
    ).toString(),
    maxStoragePrice: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(v.maxStoragePriceTBMonth)
    ).toString(),
    maxUploadPrice: toHastings(
      valuePerTBToPerByte(v.maxUploadPriceTB)
    ).toString(),
    maxDownloadPrice: toHastings(
      valuePerTBToPerByte(v.maxDownloadPriceTB)
    ).toString(),
    maxContractPrice: toHastings(v.maxContractPrice).toString(),
    hostBlockHeightLeeway: Math.round(v.hostBlockHeightLeeway.toNumber() || 0),
    minPriceTableValidity: Math.round(
      minutesInNanoseconds(v.minPriceTableValidityMinutes.toNumber() || 0)
    ),
    minAccountExpiry: Math.round(
      daysInNanoseconds(v.minAccountExpiryDays.toNumber())
    ),
    minMaxEphemeralAccountBalance: toHastings(
      v.minMaxEphemeralAccountBalance
    ).toString(),
    migrationSurchargeMultiplier: v.migrationSurchargeMultiplier.toNumber(),
  }
}

export function transformUpPinned(
  values: SubmitValuesPinned & { periodWeeks?: BigNumber },
  existingValues: SettingsPinned,
  autopilotID = 'autopilot'
): SettingsPinned {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsPinned()
  ) as ValuesPinned & { periodWeeks: BigNumber }
  return {
    ...existingValues,
    currency: v.pinnedCurrency,
    threshold: v.pinnedThreshold.div(100).toNumber(),
    autopilots: {
      [autopilotID]: {
        allowance: {
          pinned: v.shouldPinAllowance,
          value: valuePerMonthToPerPeriod(
            v.allowanceMonthPinned,
            // If autopilot is disabled the period value may be undefined,
            // but in that case the pinned allowance is also unused.
            v.periodWeeks || new BigNumber(6)
          ).toNumber(),
        },
      },
    },
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
  existingValues: SettingsUpload
): SettingsUpload {
  const v = applyDefaultToAnyEmptyValues(
    values,
    getAdvancedDefaultsUpload('mainnet')
  ) as ValuesUpload
  return {
    ...existingValues,
    defaultContractSet: v.defaultContractSet,
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
  isAutopilotEnabled,
  values,
}: {
  resources: ResourcesRequiredLoaded
  renterdState: { network: 'mainnet' | 'zen' | 'anagami' }
  isAutopilotEnabled: boolean
  values: SubmitValues
}) {
  const autopilot = isAutopilotEnabled
    ? transformUpAutopilot(
        renterdState.network,
        values,
        resources.autopilot.data
      )
    : undefined

  const gouging = transformUpGouging(values, resources.gouging.data)
  const pinned = transformUpPinned(
    values,
    resources.pinned.data,
    resources.autopilotInfo.data?.state?.id
  )
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
  defaults: Partial<Values>
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
