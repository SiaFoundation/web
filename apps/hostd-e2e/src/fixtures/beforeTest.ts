import { mockApiSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-mock'
import { login } from './login'
import { Page } from 'playwright'
import { mockApiSiaScanExchangeRates } from './siascan'
import { setCurrencyDisplay } from './preferences'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'
import { clickIf } from './click'

export async function beforeTest(page: Page) {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await setupCluster({ hostdCount: 1 })
  const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
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
