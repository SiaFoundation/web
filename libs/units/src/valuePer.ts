import BigNumber from 'bignumber.js'
import { monthsToBlocks, weeksToBlocks } from './blockTime'
import { TBToBytes } from './bytes'

export function valuePerByteToPerTB(valuePerByte: BigNumber) {
  return valuePerByte.times(TBToBytes(1))
}

export function valuePerTBToPerByte(valuePerTB: BigNumber) {
  return valuePerTB.div(TBToBytes(1))
}

export function valuePerBlockToPerMonth(valuePerBlock: BigNumber) {
  return valuePerBlock.times(monthsToBlocks(1))
}

export function valuePerMonthToPerBlock(valuePerMonth: BigNumber) {
  return valuePerMonth.div(monthsToBlocks(1))
}

export function valuePerTBPerMonthToPerBytePerBlock(
  valuePerTBPerMonth: BigNumber,
) {
  return valuePerMonthToPerBlock(valuePerTBToPerByte(valuePerTBPerMonth))
}

export function valuePerBytePerBlockToPerTBPerMonth(
  valuePerBytePerBlock: BigNumber,
) {
  return valuePerBlockToPerMonth(valuePerByteToPerTB(valuePerBytePerBlock))
}

export function valuePerPeriodToPerMonth(
  valuePerPeriod: BigNumber,
  periodBlocks: number,
) {
  const valuePerBlock = valuePerPeriod.div(periodBlocks)
  return valuePerBlock.times(monthsToBlocks(1))
}

export function valuePerMonthToPerPeriod(
  valuePerMonth: BigNumber,
  periodWeeks: BigNumber,
) {
  const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
  return valuePerMonth.times(periodBlocks).div(monthsToBlocks(1))
}

export function valuePerMillionToPerOne(valuePerMillion: BigNumber) {
  return valuePerMillion.div(1e6)
}

export function valuePerOneToPerMillion(valuePerOne: BigNumber) {
  return valuePerOne.times(1e6)
}
