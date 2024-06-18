import { mockApiSiaCentralExchangeRates } from '@siafoundation/sia-central-mock'
import { login } from './login'
import { navigateToConfig } from './navigate'
import { configResetAllSettings } from './configResetAllSettings'
import { setViewMode } from './configViewMode'
import { Page } from 'playwright'

export async function beforeTest(page: Page) {
  await mockApiSiaCentralExchangeRates({ page })
  await login({ page })

  // Reset state.
  await navigateToConfig({ page })
  await configResetAllSettings({ page })
  await setViewMode({ page, state: 'basic' })
}
