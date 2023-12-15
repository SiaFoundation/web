import {
  daysInNanoseconds,
  minutesInNanoseconds,
  nanosecondsInDays,
  nanosecondsInMinutes,
  toFixedMax,
} from '@siafoundation/design-system'
import {
  AutopilotConfig,
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/react-renterd'
import {
  toHastings,
  toSiacoins,
  blocksToWeeks,
  bytesToTB,
  weeksToBlocks,
  monthsToBlocks,
  TBToBytes,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import {
  AutopilotData,
  scDecimalPlaces,
  SettingsData,
  getAdvancedDefaultAutopilot,
  DisplayData,
  ContractSetData,
  defaultDisplay,
  defaultContractSet,
  GougingData,
  RedundancyData,
  UploadPackingData,
  defaultAutopilot,
  advancedDefaultContractSet,
} from './types'
import { ConfigDisplayOptions } from '../../hooks/useConfigDisplayOptions'

const filterUndefinedKeys = (obj: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== undefined && value !== ''
    )
  )
}

// up
export function transformUpAutopilot(
  network: 'Mainnet' | 'Zen Testnet',
  values: AutopilotData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingValues: AutopilotConfig | undefined
): AutopilotConfig {
  // merge suggestions with values, if advanced values are required they will
  // be added before this function is called and will override suggestions
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
    },
    wallet: {
      ...existingValues?.wallet,
      defragThreshold: v.defragThreshold.toNumber(),
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
        .div(
          getRedundancyMultiplierIfIncluded(
            values.minShards,
            values.totalShards,
            values.includeRedundancyMaxStoragePrice
          )
        ) // bytes/block
    ).toString(),
    maxUploadPrice: toHastings(
      values.maxUploadPriceTB.div(
        getRedundancyMultiplierIfIncluded(
          values.minShards,
          values.totalShards,
          values.includeRedundancyMaxUploadPrice
        )
      )
    ).toString(),
    maxDownloadPrice: toHastings(values.maxDownloadPriceTB).toString(),
    maxContractPrice: toHastings(values.maxContractPrice).toString(),
    minMaxCollateral: toHastings(values.minMaxCollateral).toString(),
    hostBlockHeightLeeway: Math.round(values.hostBlockHeightLeeway.toNumber()),
    minPriceTableValidity: Math.round(
      minutesInNanoseconds(values.minPriceTableValidityMinutes.toNumber())
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

export function transformUpDisplay(
  values: DisplayData,
  existingValues: Record<string, unknown> | undefined
): ConfigDisplayOptions {
  return {
    ...existingValues,
    includeRedundancyMaxStoragePrice: values.includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice: values.includeRedundancyMaxUploadPrice,
  }
}

// down
export function transformDownAutopilot(
  config?: AutopilotConfig
): AutopilotData {
  if (!config) {
    return defaultAutopilot
  }

  const autopilotContractSet = config.contracts.set
  const allowanceMonth = toSiacoins(
    valuePerPeriodToPerMonth(
      new BigNumber(config.contracts.allowance),
      config.contracts.period
    ),
    scDecimalPlaces
  )
  const amountHosts = new BigNumber(config.contracts.amount)
  const periodWeeks = new BigNumber(blocksToWeeks(config.contracts.period))
  const renewWindowWeeks = new BigNumber(
    blocksToWeeks(config.contracts.renewWindow)
  )
  const downloadTBMonth = new BigNumber(
    toFixedMax(
      valuePerPeriodToPerMonth(
        bytesToTB(config.contracts.download),
        config.contracts.period
      ),
      2
    )
  )
  const uploadTBMonth = new BigNumber(
    toFixedMax(
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
    autopilotContractSet,
    allowanceMonth,
    amountHosts,
    periodWeeks,
    renewWindowWeeks,
    downloadTBMonth,
    uploadTBMonth,
    storageTB,
    prune,
    // hosts
    allowRedundantIPs: config.hosts.allowRedundantIPs,
    maxDowntimeHours: new BigNumber(config.hosts.maxDowntimeHours),
    minRecentScanFailures: new BigNumber(config.hosts.minRecentScanFailures),
    // wallet
    defragThreshold: new BigNumber(config.wallet.defragThreshold),
  }
}

export function transformDownContractSet(
  c?: ContractSetSettings
): ContractSetData {
  if (!c) {
    return defaultContractSet
  }
  return {
    defaultContractSet: c.default,
  }
}

export function transformDownUploadPacking(
  u: UploadPackingSettings
): UploadPackingData {
  return {
    uploadPackingEnabled: u.enabled,
  }
}

export function transformDownConfigApp(ca?: ConfigDisplayOptions): DisplayData {
  if (!ca) {
    return defaultDisplay
  }
  return {
    includeRedundancyMaxStoragePrice: ca.includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice: ca.includeRedundancyMaxUploadPrice,
  }
}

export function transformDownGouging(
  g: GougingSettings,
  r: RedundancyData,
  ca: DisplayData
): GougingData {
  return {
    maxStoragePriceTBMonth: toSiacoins(
      new BigNumber(g.maxStoragePrice) // bytes/block
        .times(monthsToBlocks(1)) // bytes/month
        .times(TBToBytes(1)) // tb/month
        .times(
          getRedundancyMultiplierIfIncluded(
            r.minShards,
            r.totalShards,
            ca.includeRedundancyMaxStoragePrice
          )
        ),
      scDecimalPlaces
    ), // TB/month
    maxUploadPriceTB: toSiacoins(
      new BigNumber(g.maxUploadPrice).times(
        getRedundancyMultiplierIfIncluded(
          r.minShards,
          r.totalShards,
          ca.includeRedundancyMaxUploadPrice
        )
      ),
      scDecimalPlaces
    ),
    maxDownloadPriceTB: toSiacoins(g.maxDownloadPrice, scDecimalPlaces),
    maxContractPrice: toSiacoins(g.maxContractPrice, scDecimalPlaces),
    maxRpcPriceMillion: toSiacoins(g.maxRPCPrice, scDecimalPlaces).times(
      1_000_000
    ),
    minMaxCollateral: toSiacoins(g.minMaxCollateral, scDecimalPlaces),
    hostBlockHeightLeeway: new BigNumber(g.hostBlockHeightLeeway),
    minPriceTableValidityMinutes: new BigNumber(
      nanosecondsInMinutes(g.minPriceTableValidity)
    ),
    minAccountExpiryDays: new BigNumber(nanosecondsInDays(g.minAccountExpiry)),
    minMaxEphemeralAccountBalance: toSiacoins(
      g.minMaxEphemeralAccountBalance,
      scDecimalPlaces
    ),
    migrationSurchargeMultiplier: new BigNumber(g.migrationSurchargeMultiplier),
  }
}

export function transformDownRedundancy(r: RedundancySettings): RedundancyData {
  return {
    minShards: new BigNumber(r.minShards),
    totalShards: new BigNumber(r.totalShards),
  }
}

export type RemoteData = {
  autopilot: AutopilotConfig | undefined
  contractSet: ContractSetSettings | undefined
  uploadPacking: UploadPackingSettings
  gouging: GougingSettings
  redundancy: RedundancySettings
  display: ConfigDisplayOptions | undefined
}

export function transformDown({
  autopilot,
  contractSet,
  uploadPacking,
  gouging,
  redundancy,
  display,
}: RemoteData): SettingsData {
  const d = transformDownConfigApp(display)
  const r = transformDownRedundancy(redundancy)
  return {
    // autopilot
    ...transformDownAutopilot(autopilot),
    // contractset
    ...transformDownContractSet(contractSet),
    // uploadpacking
    ...transformDownUploadPacking(uploadPacking),
    // gouging
    ...transformDownGouging(gouging, r, d),
    // redundancy
    ...r,
    // config app
    ...d,
  }
}

export function getRedundancyMultiplier(
  minShards: BigNumber,
  totalShards: BigNumber
): BigNumber {
  let redundancyMult = new BigNumber(1)
  const canCalcRedundancy =
    minShards &&
    totalShards &&
    !minShards.isZero() &&
    !totalShards.isZero() &&
    totalShards.gte(minShards)
  if (canCalcRedundancy) {
    redundancyMult = totalShards.div(minShards)
  }
  return redundancyMult
}

export function getRedundancyMultiplierIfIncluded(
  minShards: BigNumber,
  totalShards: BigNumber,
  includeRedundancy: boolean
): BigNumber {
  const redundancyMult = getRedundancyMultiplier(minShards, totalShards)
  return includeRedundancy ? redundancyMult : new BigNumber(1)
}

export function storagePricePerMonthToPerBlock(value: BigNumber) {
  return value // TB/month
    .div(monthsToBlocks(1)) // TB/block
    .div(TBToBytes(1)) // bytes/block
}
export function storagePricePerMonthToPerBlockWithRedundancy(
  value: BigNumber,
  minShards: BigNumber,
  totalShards: BigNumber,
  includeRedundancy: boolean
) {
  return storagePricePerMonthToPerBlock(value).div(
    getRedundancyMultiplierIfIncluded(minShards, totalShards, includeRedundancy)
  )
}

export function valuePerMonthToPerPeriod(
  valuePerMonth: BigNumber,
  periodWeeks: BigNumber
) {
  const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
  return valuePerMonth.times(periodBlocks).div(monthsToBlocks(1))
}

export function valuePerPeriodToPerMonth(
  valuePerPeriod: BigNumber,
  periodBlocks: number
) {
  const valuePerBlock = valuePerPeriod.div(periodBlocks)
  return valuePerBlock.times(monthsToBlocks(1))
}
