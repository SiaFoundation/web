import { login } from './login'
import { Page } from 'playwright'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'
import {
  clickIf,
  setCurrencyDisplay,
  mockApiSiaScanExchangeRates,
  mockApiSiaScanHostMetrics,
} from '@siafoundation/e2e'

export async function beforeTest(page: Page, { hostdCount = 0 } = {}) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaScanHostMetrics({ page })
  const cluster = await setupCluster({ indexdCount: 1, hostdCount })
  const indexdNode = clusterd.nodes.find((n) => n.type === 'indexd')
  await login({
    page,
    address: indexdNode.apiAddress,
    password: indexdNode.password,
  })

  // Reset state.
  await setCurrencyDisplay(page, 'bothPreferSc')
  await clickIf(page.getByLabel('minimize onboarding wizard'), 'isVisible')

  return cluster
}

export async function afterTest() {
  teardownCluster()
}
