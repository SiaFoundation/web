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
  AutopilotData,
  SettingsData,
  getAdvancedDefaultAutopilot,
  PinningData,
  getAdvancedDefaultUpload,
} from './types'
import { ResourcesRequiredLoaded } from './resources'
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
      maxConsecutiveScanFailures: v.maxConsecutiveScanFailures.toNumber(),
      allowRedundantIPs: v.allowRedundantIPs,
      scoreOverrides: existingValues?.hosts.scoreOverrides || null,
      minProtocolVersion: v.minProtocolVersion,
    },
  }
}

export function transformUpGouging(
  values: SettingsData,
  existingValues: SettingsGouging
): SettingsGouging {
  return {
    ...existingValues,
    maxRPCPrice: toHastings(
      valuePerMillionToPerOne(values.maxRPCPriceMillion)
    ).toString(),
    maxStoragePrice: toHastings(
      valuePerTBPerMonthToPerBytePerBlock(values.maxStoragePriceTBMonth)
    ).toString(),
    maxUploadPrice: toHastings(
      valuePerTBToPerByte(values.maxUploadPriceTB)
    ).toString(),
    maxDownloadPrice: toHastings(
      valuePerTBToPerByte(values.maxDownloadPriceTB)
    ).toString(),
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

export function transformUpPinned(
  values: PinningData & { periodWeeks: BigNumber },
  existingValues: SettingsPinned,
  autopilotID: string
): SettingsPinned {
  return {
    ...existingValues,
    currency: values.pinnedCurrency,
    threshold: values.pinnedThreshold.div(100).toNumber(),
    autopilots: {
      [autopilotID]: {
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
        value: values.maxStoragePriceTBMonthPinned.toNumber(),
      },
      maxDownload: {
        pinned: values.shouldPinMaxDownloadPrice,
        value: values.maxDownloadPriceTBPinned.toNumber(),
      },
      maxUpload: {
        pinned: values.shouldPinMaxUploadPrice,
        value: values.maxUploadPriceTBPinned.toNumber(),
      },
    },
  }
}

export function transformUpUpload(
  values: Partial<SettingsData>,
  existingValues: SettingsUpload
): SettingsUpload {
  const defaultContractSet =
    values.defaultContractSet ||
    existingValues.defaultContractSet ||
    getAdvancedDefaultUpload('mainnet').defaultContractSet
  return {
    ...existingValues,
    defaultContractSet,
    packing: {
      ...existingValues.packing,
      enabled: values.uploadPackingEnabled,
    },
    redundancy: {
      ...existingValues.redundancy,
      minShards: values.minShards.toNumber(),
      totalShards: values.totalShards.toNumber(),
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
  values: SettingsData
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
    resources.autopilotState.data.id
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

export function filterUndefinedKeys(
  obj: Dictionary<string | boolean | BigNumber>
) {
  return pickBy(
    obj,
    (value) => value !== undefined && value !== null && value !== ''
  )
}
