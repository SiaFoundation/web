// country code regex
const CC_REGEX = /^[a-z]{2}$/i

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397

/**
 * convert country code to corresponding flag emoji
 * @param {string} cc - country code string
 * @returns {string} flag emoji
 */
export function countryCodeEmoji(cc?: string): string {
  if (!cc || cc === 'unknown') {
    return ''
  }
  if (!CC_REGEX.test(cc)) {
    const type = typeof cc
    console.error(
      `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
        type === 'string' ? cc : type
      }' instead.`,
    )
    return cc
  }

  const codePoints = [...cc.toUpperCase()].map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (c) => (c as any).codePointAt() + OFFSET,
  )
  return String.fromCodePoint(...codePoints)
}

export function getCountryName(cc?: string): string {
  const countryNames: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    JP: 'Japan',
    AU: 'Australia',
    NL: 'Netherlands',
    SE: 'Sweden',
    SG: 'Singapore',
    // Add more as needed
  }
  return countryNames[cc || ''] || cc || ''
}
