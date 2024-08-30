import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'

test.beforeEach(async () => {
  await setupCluster({ renterdCount: 1 })
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  await login({
    page,
    address: renterdNode.apiAddress,
    password: renterdNode.password,
  })
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
})
