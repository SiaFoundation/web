import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { TEST_TX_1 } from '../fixtures/constants'
import { keys } from '../utils'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('transaction can be searched by id', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_TX_1.id)

  await expect(page.getByText(TEST_TX_1.display.title)).toBeVisible()
})

test('transaction can be navigated to by id', async ({ page }) => {
  await explorerApp.goTo('/tx/' + TEST_TX_1.id)

  await expect(page.getByText(TEST_TX_1.display.title)).toBeVisible()
})

test('transaction can click through to a contract', async ({ page }) => {
  await explorerApp.goTo('/tx/' + TEST_TX_1.id)
  await page
    .locator(
      'a[data-testid="entity-link"][href*="25c94822bf7bd86a92d28a148d9d30151949f3599bf93af0df7b4f1e1b3c990d"]'
    )
    .click()

  await expect(page.getByText('Contract 25c94822bf7bd86...')).toBeVisible()
})

test('transaction can click through to an address', async ({ page }) => {
  await explorerApp.goTo('/tx/' + TEST_TX_1.id)
  await page
    .locator(
      'a[data-testid="entity-link"][href*="68bf48e81536f2221f3809aa9d1c89c1c869a17c6f186a088e49fd2605e4bfaaa24f26e4c42c"]'
    )
    .nth(0)
    .click()

  await expect(page.getByText('Address 68bf48e81536f22...')).toBeVisible()
})

test('transaction displays the intended data', async ({ page }) => {
  const displayKeys = keys(TEST_TX_1.display)

  await explorerApp.goTo('/tx/' + TEST_TX_1.id)

  for (const key of displayKeys) {
    const currentProperty = TEST_TX_1.display[key]
    await expect(page.getByText(currentProperty)).toBeVisible()
  }
})
