import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import {
  RENEWED_FROM_BUTTON,
  RENEWED_TO_BUTTON,
  TEST_CONTRACT_1,
} from '../fixtures/constants'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('contract can be searched by id', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_CONTRACT_1.id)

  await expect(page.getByText(TEST_CONTRACT_1.display.title)).toBeVisible()
})

test('contract can be directly navigated to', async ({ page }) => {
  await explorerApp.goTo('/contract/' + TEST_CONTRACT_1.id)

  await expect(page.getByText(TEST_CONTRACT_1.display.title)).toBeVisible()
})

test('contract displays the intended data', async ({ page }) => {
  const displayKeys = Object.keys(TEST_CONTRACT_1.display)

  await explorerApp.goTo('/contract/' + TEST_CONTRACT_1.id)

  for (const key of displayKeys) {
    const currentProperty = TEST_CONTRACT_1.display[key]
    await expect(page.getByText(currentProperty)).toBeVisible()
  }
})

test('contract can navigate to renewed from contract', async ({ page }) => {
  await explorerApp.goTo('/contract/' + TEST_CONTRACT_1.id)
  await page.getByTestId(RENEWED_FROM_BUTTON).click()

  await expect(page.getByText(TEST_CONTRACT_1.renewedFromTitle)).toBeVisible()
})

test('contract can navigate to renewed to contract', async ({ page }) => {
  await explorerApp.goTo('/contract/' + TEST_CONTRACT_1.id)
  await page.getByTestId(RENEWED_TO_BUTTON).click()

  await expect(page.getByText(TEST_CONTRACT_1.renewedToTitle)).toBeVisible()
})
