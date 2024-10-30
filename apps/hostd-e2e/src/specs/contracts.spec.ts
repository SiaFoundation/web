import { test, expect } from '@playwright/test'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { getContractRowsAll } from '../fixtures/contracts'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    renterdCount: 2,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('contracts bulk integrity check', async ({ page }) => {
  await navigateToContracts(page)
  const rows = await getContractRowsAll(page)
  rows.at(0).click()
  rows.at(-1).click({ modifiers: ['Shift'] })

  const menu = page.getByLabel('contract multi-select menu')

  // Run check for each contract.
  await menu.getByLabel('run integrity check for each contract').click()
  await expect(
    page.getByText('Integrity checks started for 2 contracts')
  ).toBeVisible()
})
