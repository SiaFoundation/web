import { test, expect } from '@playwright/test'
import { login } from '../fixtures/login'
import { setupCluster, teardownCluster } from '../fixtures/beforeTest'

let address: string
let password: string

test.beforeEach(async () => {
  const params = await setupCluster()
  address = params.address
  password = params.password
})

test.afterEach(async () => {
  await teardownCluster()
})

test('login', async ({ page }) => {
  await login({ page, address, password })
  await expect(page.getByTestId('navbar').getByText('Buckets')).toBeVisible()
})
