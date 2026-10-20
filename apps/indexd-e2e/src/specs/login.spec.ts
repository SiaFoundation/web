import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import {
  clusterd,
  setupCluster,
  teardownCluster,
} from '@siafoundation/clusterd'

test.beforeEach(async () => {
  await setupCluster({ indexdCount: 1 })
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  const indexdNode = clusterd.nodes.find((n) => n.type === 'indexd')
  await login({
    page,
    address: indexdNode.apiAddress,
    password: indexdNode.password,
  })
  await expect(page.getByTestId('sidenav').getByLabel('Hosts')).toBeVisible()
})
