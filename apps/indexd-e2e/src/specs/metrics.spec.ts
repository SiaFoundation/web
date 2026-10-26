import { test, expect, Page } from '@playwright/test'
import { afterTest, beforeTest, getIndexdNode } from '../fixtures/beforeTest'
import { navigateToMetrics } from '../fixtures/navigate'
import { registerAccount } from '../fixtures/accounts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

// Each metric is a row with the label and value side by side.
async function expectMetric(page: Page, label: string, value: string) {
  const row = page.getByText(label, { exact: true }).locator('xpath=../..')
  await expect(row).toHaveText(new RegExp(`^${label}\\s*${value}$`))
}

test('metrics show zero on a fresh indexer', async ({ page }) => {
  await navigateToMetrics(page)
  await expectMetric(page, 'Registered Accounts', '0')
  await expectMetric(page, 'Total Connect Keys', '0')
  await expectMetric(page, 'Bad Contracts', '0')
  await expectMetric(page, 'Total Capacity', '0 B')
})

test('metrics count registered accounts and connect keys', async ({ page }) => {
  const indexdNode = getIndexdNode()
  await registerAccount({ indexdNode, connectKeyDescription: 'Key A' })
  await registerAccount({ indexdNode, connectKeyDescription: 'Key B' })

  await navigateToMetrics(page)
  await expectMetric(page, 'Registered Accounts', '2')
  await expectMetric(page, 'Total Connect Keys', '2')
  // Both connect keys are on the default quota.
  await expectMetric(page, 'default', '2')
})
