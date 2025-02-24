import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { TEST_BLOCK_1 } from '../fixtures/constants'
import { keys } from '../utils'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('block can be searched by height', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_BLOCK_1.height)

  await expect(page.getByText(TEST_BLOCK_1.display.title).nth(0)).toBeVisible()
})

test('block can be searched by id', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_BLOCK_1.id)

  await expect(page.getByText(TEST_BLOCK_1.display.title).nth(0)).toBeVisible()
})

test('block can be directly navigated to by height', async ({ page }) => {
  await explorerApp.goTo('/block/' + TEST_BLOCK_1.height)

  await expect(page.getByText(TEST_BLOCK_1.display.title).nth(0)).toBeVisible()
})

test('block can navigate to previous block', async ({ page }) => {
  await explorerApp.goTo('/block/' + TEST_BLOCK_1.id)
  await page.getByTestId('explorer-block-prevBlock').click()

  await expect(
    page.getByText((Number(TEST_BLOCK_1.height) - 1).toLocaleString())
  ).toBeVisible()
})

test('block can navigate to nextblock', async ({ page }) => {
  await explorerApp.goTo('/block/' + TEST_BLOCK_1.id)
  await page.getByTestId('explorer-block-nextBlock').click()

  await expect(
    page.getByText((Number(TEST_BLOCK_1.height) + 1).toLocaleString())
  ).toBeVisible()
})

test('block can click through to a transaction', async ({ page }) => {
  await explorerApp.goTo('/block/' + TEST_BLOCK_1.id)
  await page
    .locator(
      'a[data-testid="entity-link"][href*="8a03682f22857f306a95f55a28fa9edf"]'
    )
    .click()

  await expect(page.getByText('Transaction 8a03682f22857f3...')).toBeVisible()
})

test('block displays the intended data', async ({ page }) => {
  const displayKeys = keys(TEST_BLOCK_1.display)

  await explorerApp.goTo('/block/' + TEST_BLOCK_1.height)

  for (const key of displayKeys) {
    const currentProperty = TEST_BLOCK_1.display[key]
    await expect(page.getByText(currentProperty)).toBeVisible()
  }
})
