'use client'

import { Option, Select } from '../core/Select'
import { CurrencyId, useAppSettings } from '@siafoundation/react-core'

export function CurrencyFiatSelector() {
  const { settings, setCurrency, currencyOptions } = useAppSettings()

  return (
    <Select
      aria-label="currency fiat"
      name="currencyFiat"
      disabled={!settings.siaCentral}
      value={settings.currency.id}
      onChange={(e) => setCurrency(e.currentTarget.value as CurrencyId)}
    >
      {currencyOptions.map(({ id, label }) => (
        <Option key={id} value={id}>
          {label}
        </Option>
      ))}
    </Select>
  )
}
