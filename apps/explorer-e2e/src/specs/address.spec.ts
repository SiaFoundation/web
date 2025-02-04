import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import { TEST_ADDRESS_1 } from '../fixtures/constants'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('address can be searched by id', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_ADDRESS_1.id)

  await expect(page.getByText(TEST_ADDRESS_1.display.title)).toBeVisible()
})

test('address can be directly navigated to by id', async ({ page }) => {
  await explorerApp.goTo('/address/' + TEST_ADDRESS_1.id)

  await expect(page.getByText(TEST_ADDRESS_1.display.title)).toBeVisible()
})

test('address displays the intended data', async ({ page }) => {
  const displayKeys = Object.keys(TEST_ADDRESS_1.display)

  await explorerApp.goTo('/address/' + TEST_ADDRESS_1.id)

  for (const key of displayKeys) {
    const currentProperty = TEST_ADDRESS_1.display[key]
    await expect(page.getByText(currentProperty)).toBeVisible()
  }
})

test('address can navigate to the unspent outputs list', async ({ page }) => {
  await explorerApp.goTo('/address/' + TEST_ADDRESS_1.id)
  await page.getByRole('tab').getByText('Unspent outputs').click()

  await expect(page.getByText('770b997a6042...')).toBeVisible()
})

test('address can navigate through to a transaction', async ({ page }) => {
  await explorerApp.goTo('/address/' + TEST_ADDRESS_1.id)

  await page
    .locator(
      'a[data-testid="entity-link"][href*="b24a7d623b82206cd3363db0c0d41446f106a59227d86ef081d601315dbd8cca"]'
    )
    .click()

  await expect(page.getByText('Transaction b24a7d623b82206...')).toBeVisible()
})
