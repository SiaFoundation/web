import {
  daysInMilliseconds,
  hoursInMilliseconds,
  minutesInMilliseconds,
} from '@siafoundation/design-system'

export type RevenueKeys =
  | 'potential'
  | 'earned'
  | 'rpcPotential'
  | 'rpc'
  | 'registryWritePotential'
  | 'registryWrite'
  | 'registryReadPotential'
  | 'registryRead'
  | 'egressPotential'
  | 'egress'
  | 'ingressPotential'
  | 'ingress'
  | 'storagePotential'
  | 'storage'

export type RevenueCategories = 'earned' | 'potential'

export type CollateralKeys = 'locked' | 'risked'

export type CollateralCategories = never

export type PricingKeys =
  | 'baseRPC'
  | 'sectorAccess'
  | 'contract'
  | 'collateral'
  | 'egress'
  | 'ingress'
  | 'storage'

export type ContractsKeys =
  | 'failed'
  | 'rejected'
  | 'pending'
  | 'active'
  | 'successful'

export type StorageKeys =
  | 'maxSectors'
  | 'physicalSectors'
  | 'tempSectors'
  | 'contractSectors'
  | 'registryEntries'
  | 'maxRegistryEntries'

export type StorageCategories = 'storage used' | 'storage capacity'

export type BandwidthKeys =
  | 'ingress'
  | 'ingressRHP2'
  | 'ingressRHP3'
  | 'egress'
  | 'egressRHP2'
  | 'egressRHP3'

export type OperationsKeys =
  | 'storageReads'
  | 'storageWrites'
  | 'registryReads'
  | 'registryWrites'

export type BandwidthCategories = 'ingress' | 'egress'

export type TimeRange = {
  start: number
  end: number
}

export type DataInterval =
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export const dataItervalOptions: { label: string; value: DataInterval }[] = [
  {
    label: '15m',
    value: '15m',
  },
  {
    label: 'hourly',
    value: 'hourly',
  },
  {
    label: 'daily',
    value: 'daily',
  },
  {
    label: 'weekly',
    value: 'weekly',
  },
  {
    label: 'monthly',
    value: 'monthly',
  },
  {
    label: 'yearly',
    value: 'yearly',
  },
]

export type DataTimeSpan = '7' | '30' | '90' | '365' | 'all'

export const dataTimeSpanOptions: {
  label: string
  value: DataTimeSpan
  interval: DataInterval
}[] = [
  {
    label: '7D',
    interval: '15m',
    value: '7',
  },
  {
    label: '1M',
    interval: 'hourly',
    value: '30',
  },
  {
    label: '3M',
    interval: 'daily',
    value: '90',
  },
  {
    label: '1Y',
    interval: 'daily',
    value: '365',
  },
  {
    label: 'ALL',
    interval: 'weekly',
    value: 'all',
  },
]

export function getDataIntervalInMs(dataInterval: DataInterval): number {
  if (dataInterval === '15m') {
    return minutesInMilliseconds(15)
  }
  if (dataInterval === 'hourly') {
    return hoursInMilliseconds(1)
  }
  if (dataInterval === 'daily') {
    return daysInMilliseconds(1)
  }
  if (dataInterval === 'weekly') {
    return daysInMilliseconds(7)
  }
  if (dataInterval === 'monthly') {
    return daysInMilliseconds(30)
  }
  if (dataInterval === 'yearly') {
    return daysInMilliseconds(365)
  }
  return 0
}
