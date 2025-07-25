import { countryCodeEmoji } from '@siafoundation/design-system'
import React from 'react'

export function CountryFlag({ countryCode }: { countryCode?: string }) {
  if (!countryCode || countryCode.length !== 2) {
    // Fallback to globe if country code is missing or invalid.
    return (
      <span role="img" aria-label="Unknown country">
        {countryCode}
      </span>
    )
  }
  return (
    <span role="img" aria-label={countryCode}>
      {countryCodeEmoji(countryCode)}
    </span>
  )
}
