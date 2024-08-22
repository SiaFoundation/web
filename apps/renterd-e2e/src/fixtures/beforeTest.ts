import {
  mockApiSiaCentralExchangeRates,
  mockApiSiaCentralHostsNetworkAverages,
} from '@siafoundation/sia-central-mock'
import { login } from './login'
import { navigateToConfig } from './navigate'
import { configResetAllSettings } from './configResetAllSettings'
import { setViewMode } from './configViewMode'
import { Page } from 'playwright'
import { mockApiSiaScanExchangeRates } from './siascan'
import { setCurrencyDisplay } from './preferences'

export async function beforeTest(page: Page) {
  await mockApiSiaCentralExchangeRates({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await mockApiSiaScanExchangeRates({ page })
  await login({ page })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
  await navigateToConfig({ page })
  await configResetAllSettings({ page })
  await setViewMode({ page, state: 'basic' })
}
