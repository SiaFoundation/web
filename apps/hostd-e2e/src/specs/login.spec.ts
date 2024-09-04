import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'

test.beforeEach(async () => {
  await setupCluster({ hostdCount: 1 })
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  const hostdNode = clusterd.nodes.find((n) => n.type === 'hostd')
  await login({
    page,
    address: hostdNode.apiAddress,
    password: hostdNode.password,
  })
  await expect(page.getByTestId('navbar').getByText('Overview')).toBeVisible()
})
