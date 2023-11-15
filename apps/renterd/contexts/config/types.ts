import BigNumber from 'bignumber.js'

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
  // hosts
  allowRedundantIPs: false,
  maxDowntimeHours: undefined as BigNumber | undefined,
  minRecentScanFailures: undefined as BigNumber | undefined,
  // wallet
  defragThreshold: undefined as BigNumber | undefined,
}

export const defaultContractSet = {
  defaultContractSet: '',
}

export const defaultUploadPacking = {
  uploadPackingEnabled: true,
}

export const defaultConfigApp = {
  includeRedundancyMaxStoragePrice: true,
  includeRedundancyMaxUploadPrice: true,
}

export const defaultGouging = {
  maxRpcPriceMillion: undefined as BigNumber | undefined,
  maxStoragePriceTBMonth: undefined as BigNumber | undefined,
  maxContractPrice: undefined as BigNumber | undefined,
  maxDownloadPriceTB: undefined as BigNumber | undefined,
  maxUploadPriceTB: undefined as BigNumber | undefined,
  minMaxCollateral: undefined as BigNumber | undefined,
  hostBlockHeightLeeway: undefined as BigNumber | undefined,
  minPriceTableValidityMinutes: undefined as BigNumber | undefined,
  minAccountExpiryDays: undefined as BigNumber | undefined,
  minMaxEphemeralAccountBalance: undefined as BigNumber | undefined,
  migrationSurchargeMultiplier: undefined as BigNumber | undefined,
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
  // config app
  ...defaultConfigApp,
}

export type AutopilotData = typeof defaultAutopilot
export type ContractSetData = typeof defaultContractSet
export type UploadPackingData = typeof defaultUploadPacking
export type ConfigAppData = typeof defaultConfigApp
export type GougingData = typeof defaultGouging
export type RedundancyData = typeof defaultRedundancy
export type SettingsData = typeof defaultValues

// advanced defaults
export const advancedDefaultAutopilot: AutopilotData = {
  ...defaultAutopilot,
  downloadTBMonth: new BigNumber(1),
  uploadTBMonth: new BigNumber(1),
  periodWeeks: new BigNumber(6),
  renewWindowWeeks: new BigNumber(2),
  amountHosts: new BigNumber(50),
  autopilotContractSet: 'autopilot',
  allowRedundantIPs: false,
  maxDowntimeHours: new BigNumber(336),
  minRecentScanFailures: new BigNumber(10),
  defragThreshold: new BigNumber(1000),
}

export const advancedDefaultContractSet: ContractSetData = {
  ...defaultContractSet,
  defaultContractSet: 'autopilot',
}

export const advancedDefaultConfigApp: ConfigAppData = {
  ...defaultConfigApp,
}

export const advancedDefaultUploadPacking: UploadPackingData = {
  ...defaultUploadPacking,
}

export const advancedDefaultGouging: GougingData = {
  ...defaultGouging,
}

export const advancedDefaultRedundancy: RedundancyData = {
  ...defaultRedundancy,
}
