import {
  daysInNanoseconds,
  minutesInNanoseconds,
} from '@siafoundation/design-system'
import {
  AutopilotConfig,
  BusStateResponse,
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/renterd-types'
import {
  toHastings,
  weeksToBlocks,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/units'
import {
  AutopilotData,
  SettingsData,
  getAdvancedDefaultAutopilot,
  ContractSetData,
  RedundancyData,
  UploadPackingData,
  advancedDefaultContractSet,
} from './types'
import { valuePerMonthToPerPeriod } from './utils'
import { Resources } from './resources'
import BigNumber from 'bignumber.js'

// up
export function transformUpAutopilot(
  network: 'Mainnet' | 'Zen Testnet',
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

export function transformUp({
  resources,
  renterdState,
  isAutopilotEnabled,
  values,
}: {
  resources: Resources
  renterdState: BusStateResponse
  isAutopilotEnabled: boolean
  estimatedSpendingPerMonth: BigNumber
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

  return {
    payloads: {
      autopilot,
      contractSet,
      uploadPacking,
      gouging,
      redundancy,
    },
  }
}

function filterUndefinedKeys(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== undefined && value !== ''
    )
  )
}

export function getCalculatedValues({
  estimatedSpendingPerMonth,
  isAutopilotEnabled,
  autoAllowance,
}: {
  estimatedSpendingPerMonth: BigNumber
  isAutopilotEnabled: boolean
  autoAllowance: boolean
}) {
  const calculatedValues: Partial<SettingsData> = {}
  if (isAutopilotEnabled && autoAllowance && estimatedSpendingPerMonth?.gt(0)) {
    calculatedValues.allowanceMonth = estimatedSpendingPerMonth
  }
  return calculatedValues
}
