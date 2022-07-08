import BigNumber from 'bignumber.js'
import { toHastings, toSiacoins, humanSiacoin } from './currency'

const HASTINGS_PER_SIACOIN = '1000000000000000000000000'

describe('currency', () => {
  it('converts from siacoins to hastings correctly', () => {
    const maxSC = new BigNumber('100000000000000000000000')
    for (let i = 0; i < 100; i++) {
      const sc = maxSC.times(Math.trunc(Math.random() * 10000) / 10000)
      const expectedHastings = sc.times(HASTINGS_PER_SIACOIN)
      expect(toHastings(sc).toString()).toBe(expectedHastings.toString())
    }
  })

  it('converts from hastings to siacoins correctly', () => {
    const maxH = new BigNumber('10').pow(150)
    for (let i = 0; i < 100; i++) {
      const hastings = maxH.times(Math.trunc(Math.random() * 10000) / 10000)
      const expectedSiacoins = hastings.dividedBy(HASTINGS_PER_SIACOIN)
      expect(toSiacoins(hastings).toString()).toBe(expectedSiacoins.toString())
    }
  })

  it('converts hastings to human readable representation', () => {
    expect(humanSiacoin('1')).toBe('1 H')
    expect(humanSiacoin('1000')).toBe('1000 H')
    expect(humanSiacoin('100000000000')).toBe('100000000000 H')
    expect(humanSiacoin('1000000000000')).toBe('1 pS')
    expect(humanSiacoin('1234560000000')).toBe('1.235 pS')
    expect(humanSiacoin('12345600000000')).toBe('12.346 pS')
    expect(humanSiacoin('123456000000000')).toBe('123.456 pS')
    expect(humanSiacoin('1000000000000000')).toBe('1 nS')
    expect(humanSiacoin('1000000000000000000')).toBe('1 uS')
    expect(humanSiacoin('1000000000000000000000')).toBe('1 mS')
    expect(
      humanSiacoin(new BigNumber('1').multipliedBy(HASTINGS_PER_SIACOIN))
    ).toBe('1 SC')
    expect(
      humanSiacoin(new BigNumber('1000').multipliedBy(HASTINGS_PER_SIACOIN))
    ).toBe('1 KS')
    expect(
      humanSiacoin(new BigNumber('1000000').multipliedBy(HASTINGS_PER_SIACOIN))
    ).toBe('1 MS')
    expect(
      humanSiacoin(
        new BigNumber('1000000000').multipliedBy(HASTINGS_PER_SIACOIN)
      )
    ).toBe('1 GS')
    expect(
      humanSiacoin(
        new BigNumber('1000000000000').multipliedBy(HASTINGS_PER_SIACOIN)
      )
    ).toBe('1 TS')
    expect(
      humanSiacoin(
        new BigNumber('1234560000000').multipliedBy(HASTINGS_PER_SIACOIN)
      )
    ).toBe('1.235 TS')
    expect(
      humanSiacoin(
        new BigNumber('1234560000000000').multipliedBy(HASTINGS_PER_SIACOIN)
      )
    ).toBe('1234.56 TS')
  })
})
