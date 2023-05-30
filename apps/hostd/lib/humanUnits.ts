import { monthsToBlocks, TBToBytes } from '@siafoundation/design-system'
import { toSiacoins } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'

export const humanStoragePriceSuffix = '/TB/month'
export function humanStoragePrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(
    new BigNumber(val).times(TBToBytes(1)).times(monthsToBlocks(1)),
    scDecimalPlaces
  )
}

export const humanBaseRpcPriceSuffix = '/million'
export function humanBaseRpcPrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(
    new BigNumber(val).times(1e7), // per PRC to per million RPCs
    scDecimalPlaces
  )
}

export const humanSectorAccessPriceSuffix = '/million'
export function humanSectorAccessPrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(
    new BigNumber(val).times(1e7), // per 1 access to per million access
    scDecimalPlaces
  )
}

export const humanCollateralPriceSuffix = '/TB/month'
export function humanCollateralPrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(
    new BigNumber(val).times(TBToBytes(1)).times(monthsToBlocks(1)),
    scDecimalPlaces
  )
}

export const humanEgressPriceSuffix = '/TB'
export function humanEgressPrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(new BigNumber(val).times(TBToBytes(1)), scDecimalPlaces)
}

export const humanIngressPriceSuffix = '/TB'
export function humanIngressPrice(
  val: BigNumber | string | number,
  scDecimalPlaces?: number
): BigNumber {
  return toSiacoins(new BigNumber(val).times(TBToBytes(1)), scDecimalPlaces)
}
