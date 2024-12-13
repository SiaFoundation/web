import { test, expect } from '@playwright/test'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  getContractRowByIndex,
  getContractRows,
  getContractRowsAll,
} from '../fixtures/contracts'

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

test('new contracts do not show a renewed from or to contract', async ({
  page,
}) => {
  await navigateToContracts(page)
  await expect(getContractRows(page).getByTestId('renewedFrom')).toBeHidden()
  await expect(getContractRows(page).getByTestId('renewedTo')).toBeHidden()
})

test('viewing a page with no data shows the correct empty state', async ({
  page,
}) => {
  await page.goto('/contracts?offset=100')
  // Check that the empty state is correct.
  await expect(
    page.getByText('No data on this page, reset pagination to continue.')
  ).toBeVisible()
  await expect(page.getByText('Back to first page')).toBeVisible()
  await page.getByText('Back to first page').click()
  // Ensure we are now seeing rows of data.
  await getContractRowByIndex(page, 0, true)
})
