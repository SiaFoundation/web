import { monthsToBlocks, TBToBytes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

export const humanStoragePriceSuffix = '/TB/month'
export function humanStoragePrice(val: BigNumber | string | number): BigNumber {
  return new BigNumber(val).times(TBToBytes(1)).times(monthsToBlocks(1))
}

export const humanBaseRpcPriceSuffix = '/million'
export function humanBaseRpcPrice(val: BigNumber | string | number): BigNumber {
  return new BigNumber(val).times(1e6) // per RPC to per million RPCs
}

export const humanSectorAccessPriceSuffix = '/million'
export function humanSectorAccessPrice(
  val: BigNumber | string | number
): BigNumber {
  return new BigNumber(val).times(1e6) // per 1 access to per million access
}

export const humanCollateralPriceSuffix = '/TB/month'
export function humanCollateralPrice(
  val: BigNumber | string | number
): BigNumber {
  return new BigNumber(val).times(TBToBytes(1)).times(monthsToBlocks(1))
}

export const humanEgressPriceSuffix = '/TB'
export function humanEgressPrice(val: BigNumber | string | number): BigNumber {
  return new BigNumber(val).times(TBToBytes(1))
}

export const humanIngressPriceSuffix = '/TB'
export function humanIngressPrice(val: BigNumber | string | number): BigNumber {
  return new BigNumber(val).times(TBToBytes(1))
}
