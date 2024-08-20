'use client'

import { Option, Select } from '../core/Select'
import { CurrencyDisplay, useAppSettings } from '@siafoundation/react-core'

const displayOptions = [
  { id: 'sc', label: 'Siacoin' },
  { id: 'fiat', label: 'Fiat' },
  { id: 'bothPreferSc', label: 'Both - prefer siacoin' },
  { id: 'bothPreferFiat', label: 'Both - prefer fiat' },
] as const

export function CurrencyDisplaySelector() {
  const { settings, setExternalDataSettings } = useAppSettings()

  return (
    <Select
      aria-label="currency display"
      name="currencyDisplay"
      disabled={!settings.siaCentral}
      value={settings.currencyDisplay}
      onChange={(e) =>
        setExternalDataSettings({
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
