'use client'

import { type CurrencyId, useAppSettings } from '@siafoundation/react-core'
import { Option, Select } from '../core/Select'

export function CurrencyFiatSelector() {
  const { settings, setCurrency, currencyOptions } = useAppSettings()

  return (
    <Select
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
