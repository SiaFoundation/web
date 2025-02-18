'use client'

import { CurrencyOption, currencyOptions } from './currency'

export type CurrencyDisplay = 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat'

export type ExternalDataSettings = {
  siascan: boolean
  currency: CurrencyOption
  currencyDisplay: CurrencyDisplay
}

const defaultExternalDataSettings: ExternalDataSettings = {
  siascan: true,
  currency: currencyOptions[0],
  currencyDisplay: 'bothPreferSc',
}

export function getDefaultExternalDataSettings(
  customDefaults?: Partial<ExternalDataSettings>
) {
  return {
    ...defaultExternalDataSettings,
    ...customDefaults,
  }
}
