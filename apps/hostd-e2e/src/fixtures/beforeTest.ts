import { login } from './login'
import { Page } from 'playwright'
import {
  clusterd,
  hostdWaitForContracts,
  NetworkVersion,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'
import {
  clickIf,
  setCurrencyDisplay,
  mockApiSiaScanExchangeRates,
  mockApiSiaScanHostMetrics,
} from '@siafoundation/e2e'

export async function beforeTest(
  page: Page,
  {
    renterdCount = 0,
    networkVersion = 'v2',
  }: {
    renterdCount?: number
    networkVersion?: NetworkVersion
  } = {}
) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaScanHostMetrics({ page })
  await setupCluster({ hostdCount: 1, renterdCount, networkVersion })
  const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
  await hostdWaitForContracts({ hostdNode, renterdCount, networkVersion })
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
