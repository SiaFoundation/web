import BigNumber from 'bignumber.js'

export function toFixedMax(val: BigNumber, limit: number) {
  return val.decimalPlaces() > limit ? val.toFixed(limit) : val.toString()
}

// to precision for values less than 1, otherwise to fixed
export function toFixedOrPrecision(
  val: BigNumber | number,
  {
    digits,
    dynamicFixed = true,
  }: {
    // number of digits to round to
    digits: number
    // if true, will use toFixed if decimalPlaces > digits
    dynamicFixed?: boolean
  }
) {
  const v = new BigNumber(val)
  if (v.lt(1)) {
    return v.precision(digits)
  }
  if (dynamicFixed) {
    return v.decimalPlaces() > digits ? v.toFormat(digits) : v.toFormat()
  }
  return v.toFormat(digits)
}
