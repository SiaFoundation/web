import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'

test.beforeEach(async () => {
  await setupCluster({ walletdCount: 1 })
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  console.log(clusterd.nodes)
  const node = clusterd.nodes.find((n) => n.type === 'walletd')
  await login({
    page,
    address: node.apiAddress,
    password: node.password,
  })
  await expect(page.getByTestId('navbar').getByText('Wallets')).toBeVisible()
})
