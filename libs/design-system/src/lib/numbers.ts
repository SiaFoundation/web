import BigNumber from 'bignumber.js'

export function toFixedMax(val: BigNumber, limit: number) {
  return val.decimalPlaces() > limit ? val.toFixed(limit) : val.toString()
}
