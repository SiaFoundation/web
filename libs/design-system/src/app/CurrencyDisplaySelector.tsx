'use client'

import { type CurrencyDisplay, useAppSettings } from '@siafoundation/react-core'
import { Option, Select } from '../core/Select'

const displayOptions = [
  { id: 'sc', label: 'Siacoin' },
  { id: 'fiat', label: 'Fiat' },
  { id: 'bothPreferSc', label: 'Both - prefer siacoin' },
  { id: 'bothPreferFiat', label: 'Both - prefer fiat' },
] as const

export function CurrencyDisplaySelector() {
  const { settings, setSettings } = useAppSettings()

  return (
    <Select
      disabled={!settings.siaCentral}
      value={settings.currencyDisplay}
      onChange={(e) =>
        setSettings({
          currencyDisplay: e.currentTarget.value as CurrencyDisplay,
        })
      }
    >
      {displayOptions.map(({ id, label }) => (
        <Option key={id} value={id}>
          {label}
        </Option>
      ))}
    </Select>
  )
}
