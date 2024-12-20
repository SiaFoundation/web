import { test, expect, Page } from '@playwright/test'
import { navigateToContracts } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  expectContractRowByIndex,
  getContractRows,
  getContractRowsAll,
} from '../fixtures/contracts'
import { ContractsResponse, contractsRoute } from '@siafoundation/hostd-types'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    renterdCount: 3,
  })
})

test.afterEach(async () => {
  await afterTest()
})

test('contracts bulk integrity check', async ({ page }) => {
  await navigateToContracts(page)
  const rows = await getContractRowsAll(page)
  await rows.at(0).click({ position: { x: 5, y: 5 } })
  await rows.at(2).click({ modifiers: ['Shift'] })

  const menu = page.getByLabel('contract multi-select menu')

  // Run check for each contract.
  await menu.getByLabel('run integrity check for each contract').click()
  await expect(
    page.getByText('Integrity checks started for 3 contracts')
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
  await expectContractRowByIndex(page, 0)
})

test('paginating contracts with known total and client side pagination', async ({
  page,
}) => {
  await interceptApiContactsAndEnsure3Results(page)
  await navigateToContracts(page)
  const url = page.url()
  await page.goto(url + '?limit=1')

  const first = page.getByRole('button', { name: 'go to first page' })
  const previous = page.getByRole('button', { name: 'go to previous page' })
  const next = page.getByRole('button', { name: 'go to next page' })
  const last = page.getByRole('button', { name: 'go to last page' })
  const rows = getContractRows(page)
  await expect(rows).toHaveCount(1)
  await expect(first).toBeDisabled()
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await expect(rows).toHaveCount(1)
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeEnabled()
  await expect(last).toBeEnabled()
  await next.click()
  await expect(rows).toHaveCount(1)
  await expect(first).toBeEnabled()
  await expect(previous).toBeEnabled()
  await expect(next).toBeDisabled()
  await expect(last).toBeDisabled()
})

async function interceptApiContactsAndEnsure3Results(page: Page) {
  await page.route(`**/api${contractsRoute}*`, async (route) => {
    console.log('Intercepted contracts API request')
    // Fetch the original response.
    const response = await route.fetch()

    // Parse the response body as JSON.
    const originalData: ContractsResponse = await response.json()

    // Slice the contracts down to exactly 3 items.
    const modifiedData: ContractsResponse = {
      contracts: originalData.contracts.slice(0, 3),
      count: Math.min(3, originalData.count),
    }

    // Fulfill the route with the modified response.
    await route.fulfill({
      json: modifiedData,
    })
  })
}
