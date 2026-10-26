import { login } from './login'
import { mockApiDaemonExplorerExchangeRate } from './explorer'
import { Page } from 'playwright'
import {
  ClusterNodeIndexd,
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
  // 1 SC = 0.01 in every currency, which keeps conversions easy to check.
  await mockApiDaemonExplorerExchangeRate({ page, rate: 0.01 })
  const cluster = await setupCluster({ indexdCount: 1, hostdCount })
  const indexdNode = getIndexdNode()
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

export function getIndexdNode() {
  return clusterd.nodes.find((n): n is ClusterNodeIndexd => n.type === 'indexd')
}

export async function afterTest() {
  teardownCluster()
}
