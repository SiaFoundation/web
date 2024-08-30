import { login } from './login'
import { Page } from 'playwright'
import { setCurrencyDisplay } from './preferences'
import { mockApiSiaScanExchangeRates } from './siascan'
import { mockApiSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-mock'
import { clickIf } from './click'
import { clusterd, setupCluster, teardownCluster } from './clusterd'

export async function beforeTest(page: Page, { hostdCount = 0 } = {}) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await setupCluster({ hostdCount })
  await login({
    page,
    address: clusterd.renterdAddress,
    password: clusterd.renterdPassword,
  })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
  await clickIf(page.getByLabel('minimize onboarding wizard'), 'isVisible')
}

export async function afterTest() {
  teardownCluster()
}
