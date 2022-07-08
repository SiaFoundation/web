import { BigNumber } from 'bignumber.js'

// Siacoin -> hastings unit conversion functions
// These make conversion between units of Sia easy and consistent for developers.
// Never return exponentials from BigNumber.toString, since they confuse the API
BigNumber.config({ EXPONENTIAL_AT: 1e9 })
BigNumber.config({ DECIMAL_PLACES: 30 })

// Hastings is the lowest divisible unit in Sia. This constant will be used to
// calculate the conversion between the base unit to human readable values.
const hastingsPerSiacoin = new BigNumber('10').exponentiatedBy(24)

export function toSiacoins(hastings: BigNumber | number | string) {
  return new BigNumber(hastings).dividedBy(hastingsPerSiacoin)
}

export function toHastings(siacoins: BigNumber | number | string) {
  return new BigNumber(siacoins).times(hastingsPerSiacoin)
}

/**
 * Converts hastings amount into human readable format.
 * This is copy of the HumanString function from Sia repo.
 * @param hastings amount of hastings to convert
 */
export function humanSiacoin(
  hastings: BigNumber | number | string
): string | null {
  const pico = new BigNumber(1e12)
  const exp = new BigNumber(1e3)
  const val = new BigNumber(hastings)
  const amount = new BigNumber(hastings).abs()
  const sign = val.isNegative() ? '-' : ''

  if (amount.dividedBy(pico).isLessThan(1)) {
    return `${sign}${amount} H`
  }

  const suffixes = ['pS', 'nS', 'uS', 'mS', 'SC', 'KS', 'MS', 'GS', 'TS']

  for (let index = 0; index < suffixes.length; index++) {
    const mag = Array(index)
      .fill(null)
      .reduce((acc) => acc.multipliedBy(exp), new BigNumber(1))
    const reduced = amount.dividedBy(pico.multipliedBy(mag))
    if (reduced.isLessThan(exp) || index === suffixes.length - 1) {
      return `${sign}${reduced.decimalPlaces(3)} ${suffixes[index]}`
    }
  }

  return null
}
