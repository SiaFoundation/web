import BigNumber from 'bignumber.js'
import { blocksToWeeks, weeksToBlocks } from './blockTime'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  valuePerByteToPerTB,
  valuePerMonthToPerPeriod,
  valuePerPeriodToPerMonth,
  valuePerTBPerMonthToPerBytePerBlock,
} from './valuePer'

describe('valuePer', () => {
  it('month -> period', () => {
    const valuePerMonth = new BigNumber(87908469486735)
    const periodWeeks = new BigNumber(30).div(7)
    expect(valuePerMonthToPerPeriod(valuePerMonth, periodWeeks)).toEqual(
      valuePerMonth,
    )
  })

  it('period <- month', () => {
    const valuePerMonth = new BigNumber(30)
    const periodWeeks = new BigNumber(30).div(7)
    const valuePerPeriod = valuePerMonthToPerPeriod(valuePerMonth, periodWeeks)

    const periodBlocks = weeksToBlocks(periodWeeks.toNumber())
    expect(
      valuePerPeriodToPerMonth(valuePerPeriod, periodBlocks).toFixed(0),
    ).toEqual('30')
  })

  it('period -> month -> period', () => {
    const valuePerPeriod = new BigNumber(91085125718831)
    const periodBlocks = new BigNumber(4244)
    const valuePerMonth = valuePerPeriodToPerMonth(
      valuePerPeriod,
      periodBlocks.toNumber(),
    )
    expect(valuePerMonth).toEqual(
      new BigNumber('92716244841034.3826578699340245152'),
    )
    const periodWeeks = new BigNumber(blocksToWeeks(periodBlocks.toNumber()))
    expect(
      valuePerMonthToPerPeriod(valuePerMonth, periodWeeks).toFixed(0),
    ).toEqual(valuePerPeriod.toString())
  })

  it('valuePerTBPerMonthToPerBytePerBlock', () => {
    expect(valuePerTBPerMonthToPerBytePerBlock(new BigNumber(1e16))).toEqual(
      new BigNumber('2.31481481481481481481'),
    )
  })

  it('valuePerBytePerBlockToPerTBPerMonth', () => {
    expect(
      valuePerBytePerBlockToPerTBPerMonth(
        new BigNumber('2.314814814814814814814814814815'),
      ).toFixed(0),
    ).toEqual(new BigNumber(1e16).toString())
  })

  it('valuePerByteToPerTB', () => {
    expect(valuePerByteToPerTB(new BigNumber(1))).toEqual(new BigNumber(1e12))
  })
})
