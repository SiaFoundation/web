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
  maxConsecutiveScanFailures: undefined as BigNumber | undefined,
  minProtocolVersion: '',
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

export const defaultPinned = {
  pinnedCurrency: '' as CurrencyId | '',
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

export const defaultUpload = {
  // default contract set
  defaultContractSet: '',
  // packing
  uploadPackingEnabled: true,
  // redundancy
  minShards: undefined as BigNumber | undefined,
  totalShards: undefined as BigNumber | undefined,
}

export const defaultRedundancy = {}

export const defaultValues = {
  // autopilot
  ...defaultAutopilot,
  // gouging
  ...defaultGouging,
  // pinning
  ...defaultPinned,
  // upload
  ...defaultUpload,
}

export type AutopilotData = typeof defaultAutopilot
export type GougingData = typeof defaultGouging
export type PinningData = typeof defaultPinned
export type UploadData = typeof defaultUpload
export type SettingsData = typeof defaultValues

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
          maxConsecutiveScanFailures: new BigNumber(10),
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
          maxConsecutiveScanFailures: new BigNumber(10),
          minProtocolVersion: '1.6.0',
          prune: true,
        }),
  }
}

export const advancedDefaultGouging: GougingData = {
  ...defaultGouging,
}

export const advancedDefaultPinned: PinningData = {
  ...defaultPinned,
}

export function getAdvancedDefaultUpload(
  network: 'mainnet' | 'zen' | 'anagami'
): UploadData {
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
    ...defaultUpload,
    defaultContractSet: 'autopilot',
    ...advancedDefaultRedundancy,
  }
}

export function getAdvancedDefaults(
  network: 'mainnet' | 'zen' | 'anagami'
): SettingsData {
  return {
    ...getAdvancedDefaultAutopilot(network),
    ...advancedDefaultGouging,
    ...advancedDefaultPinned,
    ...getAdvancedDefaultUpload(network),
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
