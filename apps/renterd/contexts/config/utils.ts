import { weeksToBlocks, monthsToBlocks, TBToBytes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

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

export function storagePricePerMonthToPerBlock(value: BigNumber) {
  return value // TB/month
    .div(monthsToBlocks(1)) // TB/block
    .div(TBToBytes(1)) // bytes/block
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
