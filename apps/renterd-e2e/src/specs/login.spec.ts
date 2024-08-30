import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import { clusterd, setupCluster, teardownCluster } from '../fixtures/clusterd'

test.beforeEach(async () => {
  await setupCluster()
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  await login({
    page,
    address: clusterd.renterdAddress,
    password: clusterd.renterdPassword,
  })
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
})
