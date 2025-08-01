import { countryCodeEmoji, getCountryName } from '@siafoundation/units'

export function CountryFlag({ countryCode }: { countryCode?: string }) {
  if (countryCode === 'unknown') {
    return null
  }
  return (
    <span role="img" aria-label={getCountryName(countryCode)}>
      {countryCodeEmoji(countryCode)}
    </span>
  )
}
