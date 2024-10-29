import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import {
  DATUM_VALUE,
  TEST_HOST_1,
  HOST_SETTINGS_PATTERNS,
  HOST_PRICING,
} from '../fixtures/constants'

// Hosts can not be guaranteed like other test slices. Therefore, we'll grab
// the displayed values and test them against the patterns we expect to see.

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('host can be searched by id', async ({ page }) => {
  await explorerApp.goTo('/')
  await explorerApp.navigateBySearchBar(TEST_HOST_1.pubkey)

  await expect(page.getByText(TEST_HOST_1.display.title)).toBeVisible()
})

test('host can be directly navigated to', async ({ page }) => {
  await explorerApp.goTo('/host/' + TEST_HOST_1.pubkey)

  await expect(page.getByText(TEST_HOST_1.display.title)).toBeVisible()
})

test('host displays properly formatted host pricing', async ({ page }) => {
  await explorerApp.goTo('/host/' + TEST_HOST_1.pubkey)

  const hostSettings = await page.getByTestId(HOST_PRICING).allInnerTexts()

  for (const text of hostSettings) {
    const matched = HOST_SETTINGS_PATTERNS.some((pattern) => {
      return text.match(new RegExp(pattern))
    })
    // If we're failing, uncomment this and check console.
    // console.log(matched || text)
    expect(matched).toBe(true)
  }
})

test('host displays properly formatted host settings', async ({ page }) => {
  await explorerApp.goTo('/host/' + TEST_HOST_1.pubkey)

  const hostSettings = await page.getByTestId(DATUM_VALUE).allInnerTexts()

  for (const text of hostSettings) {
    const matched = HOST_SETTINGS_PATTERNS.some((pattern) => {
      return text.match(new RegExp(pattern))
    })
    // If we're failing, uncomment this and check console.
    // console.log(matched || text)
    expect(matched).toBe(true)
  }
})
