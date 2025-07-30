import { NoUndefined } from '@siafoundation/types'
import { CurrencyId } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type Categories =
  | 'storage'
  | 'gouging'
  | 'hosts'
  | 'wallet'
  | 'uploadpacking'
  | 'redundancy'
  | 'pinning'

export type ConfigViewMode = 'basic' | 'advanced'

export const scDecimalPlaces = 6

// form defaults
export const inputValuesAutopilot = {
  // contracts
  amountHosts: undefined as BigNumber | undefined,
  periodWeeks: undefined as BigNumber | undefined,
  renewWindowWeeks: undefined as BigNumber | undefined,
  downloadTBMonth: undefined as BigNumber | undefined,
  uploadTBMonth: undefined as BigNumber | undefined,
  storageTB: undefined as BigNumber | undefined,
  prune: false,
  // hosts
  maxDowntimeHours: undefined as BigNumber | undefined,
  maxConsecutiveScanFailures: undefined as BigNumber | undefined,
  minProtocolVersion: '',
}

export const inputValuesGouging = {
  maxRPCPriceMillion: undefined as BigNumber | undefined,
  maxStoragePriceTBMonth: undefined as BigNumber | undefined,
  maxContractPrice: undefined as BigNumber | undefined,
  maxDownloadPriceTB: undefined as BigNumber | undefined,
  maxUploadPriceTB: undefined as BigNumber | undefined,
  hostBlockHeightLeeway: undefined as BigNumber | undefined,
  minPriceTableValidityMinutes: undefined as BigNumber | undefined,
  minAccountExpiryDays: undefined as BigNumber | undefined,
  minMaxEphemeralAccountBalance: undefined as BigNumber | undefined,
}

export const inputValuesPinned = {
  pinnedCurrency: '' as CurrencyId | '',
  pinnedThreshold: undefined as BigNumber | undefined,
  shouldPinMaxStoragePrice: false,
  maxStoragePriceTBMonthPinned: undefined as BigNumber | undefined,
  shouldPinMaxDownloadPrice: false,
  maxDownloadPriceTBPinned: undefined as BigNumber | undefined,
  shouldPinMaxUploadPrice: false,
  maxUploadPriceTBPinned: undefined as BigNumber | undefined,
}

export const inputValuesUpload = {
  // packing
  uploadPackingEnabled: true,
  // redundancy
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
}

export const inputValues = {
  // autopilot
  ...inputValuesAutopilot,
  // gouging
  ...inputValuesGouging,
  // pinning
  ...inputValuesPinned,
  // upload
  ...inputValuesUpload,
}

// InputValues: form fields can be undefined when they are cleared.
export type InputValuesAutopilot = typeof inputValuesAutopilot
export type InputValuesGouging = typeof inputValuesGouging
export type InputValuesPinned = typeof inputValuesPinned
export type InputValuesUpload = typeof inputValuesUpload
export type InputValues = typeof inputValues

// Values: all daemon required fields are present.
export type ValuesAutopilot = NoUndefined<InputValuesAutopilot>
export type ValuesGouging = NoUndefined<InputValuesGouging>
export type ValuesPinned = NoUndefined<InputValuesPinned>
export type ValuesUpload = NoUndefined<InputValuesUpload>
export type Values = NoUndefined<InputValues>

// AdvancedDefaults: fields set in the background in basic mode.
export type AdvancedDefaultsAutopilot = ReturnType<
  typeof getAdvancedDefaultsAutopilot
>
export type AdvancedDefaultsGouging = ReturnType<
  typeof getAdvancedDefaultsGouging
>
export type AdvancedDefaultsPinned = ReturnType<
  typeof getAdvancedDefaultsPinned
>
export type AdvancedDefaultsUpload = ReturnType<
  typeof getAdvancedDefaultsUpload
>
export type AdvancedDefaults = ReturnType<typeof getAdvancedDefaults>

export type GetSubmitValues<Values, Defaults> = Omit<Values, keyof Defaults> &
  Partial<Defaults>

// SubmitValues: all fields required to submit the form are present.
export type SubmitValuesAutopilot = GetSubmitValues<
  ValuesAutopilot,
  AdvancedDefaultsAutopilot
>
export type SubmitValuesGouging = GetSubmitValues<
  ValuesGouging,
  AdvancedDefaultsGouging
>
export type SubmitValuesPinned = GetSubmitValues<
  ValuesPinned,
  AdvancedDefaultsPinned
>
export type SubmitValuesUpload = GetSubmitValues<
  ValuesUpload,
  AdvancedDefaultsUpload
>
export type SubmitValues = GetSubmitValues<Values, AdvancedDefaults>

// advanced defaults
export function getAdvancedDefaultsAutopilot(
  network: 'mainnet' | 'zen' | 'anagami',
) {
  return network === 'mainnet'
    ? {
        periodWeeks: new BigNumber(6),
        renewWindowWeeks: new BigNumber(2),
        amountHosts: new BigNumber(50),
        maxDowntimeHours: new BigNumber(336),
        maxConsecutiveScanFailures: new BigNumber(10),
        minProtocolVersion: '1.6.0',
        prune: true,
      }
    : {
        periodWeeks: new BigNumber(6),
        renewWindowWeeks: new BigNumber(2),
        amountHosts: new BigNumber(12),
        maxDowntimeHours: new BigNumber(336),
        maxConsecutiveScanFailures: new BigNumber(10),
        minProtocolVersion: '1.6.0',
        prune: true,
      }
}

export function getAdvancedDefaultsGouging() {
  return {
    hostBlockHeightLeeway: new BigNumber(6),
  }
}

export function getAdvancedDefaultsPinned() {
  return {}
}

export function getAdvancedDefaultsUpload(
  network: 'mainnet' | 'zen' | 'anagami',
) {
  const advancedDefaultRedundancy =
    network === 'mainnet'
      ? {
          minShards: new BigNumber(10),
          totalShards: new BigNumber(30),
        }
      : {
          minShards: new BigNumber(2),
          totalShards: new BigNumber(6),
        }
  return {
    uploadPackingEnabled: true,
    ...advancedDefaultRedundancy,
  }
}

export function getAdvancedDefaults(network: 'mainnet' | 'zen' | 'anagami') {
  return {
    ...getAdvancedDefaultsAutopilot(network),
    ...getAdvancedDefaultsGouging(),
    ...getAdvancedDefaultsPinned(),
    ...getAdvancedDefaultsUpload(network),
  }
}

export type RecommendationItem = {
  hrefId: string
  key: keyof InputValues
  title: string
  currentLabel: string
  targetLabel: string
  currentValue: BigNumber
  targetValue: BigNumber
  direction: 'up' | 'down'
}
