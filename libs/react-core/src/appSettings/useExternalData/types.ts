'use client'

import { CurrencyOption, currencyOptions } from './currency'

export type CurrencyDisplay = 'sc' | 'fiat' | 'bothPreferSc' | 'bothPreferFiat'

export type ExternalDataSettings = {
  siaCentral: boolean
  siascan: boolean
  daemonExplorer: {
    enabled: boolean
    url: string
  }
  currency: CurrencyOption
  currencyDisplay: CurrencyDisplay
}

const defaultExternalDataSettings: ExternalDataSettings = {
  siaCentral: true,
  siascan: true,
  daemonExplorer: {
    enabled: false,
    url: '',
  },
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
