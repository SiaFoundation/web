import { login } from './login'
import { Page } from 'playwright'
import {
  clusterd,
  hostdWaitForContracts,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'
import {
  clickIf,
  setCurrencyDisplay,
  mockApiSiaScanExchangeRates,
  mockApiSiaScanHostMetrics,
} from '@siafoundation/e2e'

export async function beforeTest(page: Page, { renterdCount = 0 } = {}) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaScanHostMetrics({ page })
  await setupCluster({ hostdCount: 1, renterdCount })
  const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
  await hostdWaitForContracts({ hostdNode, renterdCount })
  await login({
    page,
    address: hostdNode.apiAddress,
    password: hostdNode.password,
  })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
  await clickIf(page.getByLabel('minimize onboarding wizard'), 'isVisible')
}

export async function afterTest() {
  teardownCluster()
}
