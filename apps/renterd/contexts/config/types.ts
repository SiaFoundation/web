import { CurrencyId } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type Categories =
  | 'storage'
  | 'gouging'
  | 'hosts'
  | 'wallet'
  | 'contractset'
  | 'uploadpacking'
  | 'redundancy'
  | 'pinning'

export type ConfigViewMode = 'basic' | 'advanced'

export const scDecimalPlaces = 6

// form defaults
export const defaultAutopilot = {
  // contracts
  autopilotContractSet: '',
  amountHosts: undefined as BigNumber | undefined,
  allowanceMonth: undefined as BigNumber | undefined,
  periodWeeks: undefined as BigNumber | undefined,
  renewWindowWeeks: undefined as BigNumber | undefined,
  downloadTBMonth: undefined as BigNumber | undefined,
  uploadTBMonth: undefined as BigNumber | undefined,
  storageTB: undefined as BigNumber | undefined,
  prune: false,
  // hosts
  allowRedundantIPs: false,
  maxDowntimeHours: undefined as BigNumber | undefined,
  minRecentScanFailures: undefined as BigNumber | undefined,
  minProtocolVersion: '',
}

export const defaultContractSet = {
  defaultContractSet: '',
}

export const defaultUploadPacking = {
  uploadPackingEnabled: true,
}

export const defaultGouging = {
  maxRPCPriceMillion: undefined as BigNumber | undefined,
  maxStoragePriceTBMonth: undefined as BigNumber | undefined,
  maxContractPrice: undefined as BigNumber | undefined,
  maxDownloadPriceTB: undefined as BigNumber | undefined,
  maxUploadPriceTB: undefined as BigNumber | undefined,
  hostBlockHeightLeeway: undefined as BigNumber | undefined,
  minPriceTableValidityMinutes: undefined as BigNumber | undefined,
  minAccountExpiryDays: undefined as BigNumber | undefined,
  minMaxEphemeralAccountBalance: undefined as BigNumber | undefined,
  migrationSurchargeMultiplier: undefined as BigNumber | undefined,
}

export const defaultPricePinning = {
  pinningEnabled: false,
  pinnedCurrency: '' as CurrencyId | '',
  forexEndpointURL: '',
  pinnedThreshold: undefined as BigNumber | undefined,
  shouldPinMaxStoragePrice: false,
  maxStoragePriceTBMonthPinned: undefined as BigNumber | undefined,
  shouldPinMaxDownloadPrice: false,
  maxDownloadPriceTBPinned: undefined as BigNumber | undefined,
  shouldPinMaxUploadPrice: false,
  maxUploadPriceTBPinned: undefined as BigNumber | undefined,
  shouldPinAllowance: false,
  allowanceMonthPinned: undefined as BigNumber | undefined,
}

export const defaultRedundancy = {
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
}

export const defaultValues = {
  // autopilot
  ...defaultAutopilot,
  // contract set
  ...defaultContractSet,
  // upload packing
  ...defaultUploadPacking,
  // gouging
  ...defaultGouging,
  // redundancy
  ...defaultRedundancy,
  // price pinning
  ...defaultPricePinning,
}

export type AutopilotData = typeof defaultAutopilot
export type ContractSetData = typeof defaultContractSet
export type UploadPackingData = typeof defaultUploadPacking
export type GougingData = typeof defaultGouging
export type RedundancyData = typeof defaultRedundancy
export type SettingsData = typeof defaultValues
export type PricePinData = typeof defaultPricePinning

// advanced defaults
export function getAdvancedDefaultAutopilot(
  network: 'mainnet' | 'zen' | 'anagami'
): AutopilotData {
  return {
    // must be set
    storageTB: undefined,
    downloadTBMonth: undefined,
    uploadTBMonth: undefined,
    // calcuated and set
    allowanceMonth: undefined,
    // defaults
    ...(network === 'mainnet'
      ? {
          periodWeeks: new BigNumber(6),
          renewWindowWeeks: new BigNumber(2),
          amountHosts: new BigNumber(50),
          autopilotContractSet: 'autopilot',
          allowRedundantIPs: false,
          maxDowntimeHours: new BigNumber(336),
          minRecentScanFailures: new BigNumber(10),
          minProtocolVersion: '1.6.0',
          prune: true,
        }
      : {
          periodWeeks: new BigNumber(6),
          renewWindowWeeks: new BigNumber(2),
          amountHosts: new BigNumber(12),
          autopilotContractSet: 'autopilot',
          allowRedundantIPs: false,
          maxDowntimeHours: new BigNumber(336),
          minRecentScanFailures: new BigNumber(10),
          minProtocolVersion: '1.6.0',
          prune: true,
        }),
  }
}

export const advancedDefaultContractSet: ContractSetData = {
  ...defaultContractSet,
  defaultContractSet: 'autopilot',
}

export const advancedDefaultUploadPacking: UploadPackingData = {
  ...defaultUploadPacking,
}

export const advancedDefaultGouging: GougingData = {
  ...defaultGouging,
}

export const advancedDefaultPricePinning: PricePinData = {
  ...defaultPricePinning,
}

export function getAdvancedDefaultRedundancy(
  network: 'mainnet' | 'zen' | 'anagami'
): RedundancyData {
  return network === 'mainnet'
    ? {
        minShards: new BigNumber(10),
        totalShards: new BigNumber(30),
      }
    : {
        minShards: new BigNumber(2),
        totalShards: new BigNumber(6),
      }
}

export function getAdvancedDefaults(
  network: 'mainnet' | 'zen' | 'anagami'
): SettingsData {
  return {
    ...getAdvancedDefaultAutopilot(network),
    ...advancedDefaultContractSet,
    ...advancedDefaultUploadPacking,
    ...advancedDefaultGouging,
    ...getAdvancedDefaultRedundancy(network),
    ...advancedDefaultPricePinning,
  }
}

export type RecommendationItem = {
  hrefId: string
  key: keyof SettingsData
  title: string
  currentLabel: string
  targetLabel: string
  currentValue: BigNumber
  targetValue: BigNumber
  direction: 'up' | 'down'
}
