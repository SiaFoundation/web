import { blocksToWeeks, weeksToBlocks } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { valuePerMonthToPerPeriod, valuePerPeriodToPerMonth } from './utils'

describe('utils', () => {
  it('ap download', () => {
    const valuePerPeriod = new BigNumber(91085125718831)
    const periodBlocks = new BigNumber(4244)
    const valuePerMonth = valuePerPeriodToPerMonth(
      valuePerPeriod,
      periodBlocks.toNumber(),
    )
    expect(valuePerMonth).toEqual(
      new BigNumber('92716244841034.38265786993402450518378887952'),
    )
    const periodWeeks = new BigNumber(blocksToWeeks(periodBlocks.toNumber()))
    expect(
      valuePerMonthToPerPeriod(valuePerMonth, periodWeeks).toFixed(0),
    ).toEqual(valuePerPeriod.toString())
  })

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
})
