import {
  daysInNanoseconds,
  minutesInNanoseconds,
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
  toHastings,
  weeksToBlocks,
  TBToBytes,
  valuePerTBPerMonthToPerBytePerBlock,
  valuePerMonthToPerPeriod,
  valuePerTBToPerByte,
  valuePerMillionToPerOne,
} from '@siafoundation/units'
import {
  AutopilotData,
  SettingsData,
  getAdvancedDefaultAutopilot,
  ContractSetData,
  RedundancyData,
  UploadPackingData,
  advancedDefaultContractSet,
  PricePinData,
} from './types'
import { Resources } from './resources'
import BigNumber from 'bignumber.js'
import { pickBy } from '@technically/lodash'
import { Dictionary } from 'lodash'

// up
export function transformUpAutopilot(
  network: 'mainnet' | 'zen' | 'anagami',
  values: AutopilotData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: AutopilotConfig | undefined
): AutopilotConfig {
  // Merge suggestions with values, if advanced values are required they will
  // be added before this function is called and will override suggestions.
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
      minProtocolVersion: v.minProtocolVersion,
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
      valuePerMillionToPerOne(values.maxRPCPriceMillion)
    ).toString(),
    maxStoragePrice: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(values.maxStoragePriceTBMonth)
    ).toString(),
    maxUploadPrice: toHastings(values.maxUploadPriceTB).toString(),
    maxDownloadPrice: toHastings(values.maxDownloadPriceTB).toString(),
    maxContractPrice: toHastings(values.maxContractPrice).toString(),
    hostBlockHeightLeeway: Math.round(
      values.hostBlockHeightLeeway?.toNumber() || 0
    ),
    minPriceTableValidity: Math.round(
      minutesInNanoseconds(values.minPriceTableValidityMinutes?.toNumber() || 0)
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

export function transformUpPricePinning(
  values: PricePinData & { periodWeeks: BigNumber },
  existingValues: PricePinSettings
): PricePinSettings {
  return {
    ...existingValues,
    enabled: values.pinningEnabled,
    currency: values.pinnedCurrency,
    forexEndpointURL: values.forexEndpointURL,
    threshold: values.pinnedThreshold.div(100).toNumber(),
    autopilots: {
      // Update the default autopilot named 'autopilot'.
      autopilot: {
        allowance: {
          pinned: values.shouldPinAllowance,
          value: valuePerMonthToPerPeriod(
            values.allowanceMonthPinned,
            // If autopilot is disabled the period value may be undefined,
            // but in that case the pinned allowance is also unused.
            values.periodWeeks || new BigNumber(6)
          ).toNumber(),
        },
      },
    },
    gougingSettingsPins: {
      maxStorage: {
        pinned: values.shouldPinMaxStoragePrice,
        value: valuePerTBPerMonthToPerBytePerBlock(
          values.maxStoragePriceTBMonthPinned
        ).toNumber(),
      },
      maxDownload: {
        pinned: values.shouldPinMaxDownloadPrice,
        value: valuePerTBToPerByte(values.maxDownloadPriceTBPinned).toNumber(),
      },
      maxUpload: {
        pinned: values.shouldPinMaxUploadPrice,
        value: valuePerTBToPerByte(values.maxUploadPriceTBPinned).toNumber(),
      },
      maxRPCPrice: {
        pinned: values.shouldPinMaxRPCPrice,
        value: valuePerMillionToPerOne(
          values.maxRPCPriceMillionPinned
        ).toNumber(),
      },
    },
  }
}

export function transformUp({
  resources,
  renterdState,
  isAutopilotEnabled,
  values,
}: {
  resources: Resources
  renterdState: { network: 'mainnet' | 'zen' | 'anagami' }
  isAutopilotEnabled: boolean
  values: SettingsData
}) {
  const autopilot = isAutopilotEnabled
    ? transformUpAutopilot(
        renterdState.network,
        values,
        resources.autopilot.data
      )
    : undefined

  const contractSet = transformUpContractSet(values, resources.contractSet.data)
  const uploadPacking = transformUpUploadPacking(
    values,
    resources.uploadPacking.data
  )
  const gouging = transformUpGouging(values, resources.gouging.data)
  const redundancy = transformUpRedundancy(values, resources.redundancy.data)
  const pricePinning = transformUpPricePinning(
    values,
    resources.pricePinning.data
  )

  return {
    payloads: {
      autopilot,
      contractSet,
      uploadPacking,
      gouging,
      redundancy,
      pricePinning,
    },
  }
}

export function filterUndefinedKeys(
  obj: Dictionary<string | boolean | BigNumber>
) {
  return pickBy(
    obj,
    (value) => value !== undefined && value !== null && value !== ''
  )
}
