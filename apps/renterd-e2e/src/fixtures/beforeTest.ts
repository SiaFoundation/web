import { mockApiSiaCentralExchangeRates } from '@siafoundation/sia-central-mock'
import type { Page } from 'playwright'
import { configResetAllSettings } from './configResetAllSettings'
import { setViewMode } from './configViewMode'
import { login } from './login'
import { navigateToConfig } from './navigate'

export async function beforeTest(page: Page) {
  await mockApiSiaCentralExchangeRates({ page })
  await login({ page })

  // Reset state.
  await navigateToConfig({ page })
  await configResetAllSettings({ page })
  await setViewMode({ page, state: 'basic' })
}
