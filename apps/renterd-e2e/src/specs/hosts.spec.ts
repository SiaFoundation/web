import { test, expect } from '@playwright/test'
import { navigateToHosts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { getHostRowByIndex } from '../fixtures/hosts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('hosts explorer shows all hosts', async ({ page }) => {
  await navigateToHosts({ page })

  const row1 = await getHostRowByIndex(page, 0)
  const row2 = await getHostRowByIndex(page, 1)
  const row3 = await getHostRowByIndex(page, 2)
  await expect(row1).toBeVisible()
  await expect(row2).toBeVisible()
  await expect(row3).toBeVisible()
})
