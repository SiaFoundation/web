import { login } from './login'
import { Page } from 'playwright'
import {
  clusterd,
  setupCluster,
  teardownCluster,
  renterdWaitForContracts,
} from '@siafoundation/clusterd'
import {
  setCurrencyDisplay,
  mockApiSiaScanExchangeRates,
  clickIf,
  mockApiSiaScanHostMetrics,
} from '@siafoundation/e2e'

export async function beforeTest(page: Page, { hostdCount = 0 } = {}) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaScanHostMetrics({ page })
  await setupCluster({ renterdCount: 1, hostdCount })
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  await renterdWaitForContracts({ renterdNode, hostdCount })
  await login({
    page,
    address: renterdNode.apiAddress,
    password: renterdNode.password,
  })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
  await clickIf(page.getByLabel('minimize onboarding wizard'), 'isVisible')
}

export async function afterTest() {
  teardownCluster()
}
