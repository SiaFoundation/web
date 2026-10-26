import { test, expect } from '@playwright/test'
import { getCurrentHeight } from '@siafoundation/clusterd'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToNode } from '../fixtures/navigate'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('node shows the synced height', async ({ page }) => {
  const height = await getCurrentHeight()
  await navigateToNode(page)
  await expect(
    page.getByText(Number(height).toLocaleString('en-US'), { exact: true }),
  ).toBeVisible()
})
