import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import {
  APP_NAME,
  APP_NETWORK,
  LATEST_BLOCKS_ITEM,
  METRICS_ITEM,
  TOP_HOSTS_ITEMS,
} from '../fixtures/constants'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)

  await explorerApp.goTo('/')
})

test('home displays app identity', async ({ page }) => {
  await expect(page.getByTestId(APP_NAME)).toContainText('siascan')
  await expect(page.getByTestId(APP_NETWORK)).toContainText('zen') // Can we get this via environmental variables? Will we always run these on zen?
})

// The expectations below have their boundary around the display of a sucessful network call.
// If the call fails, we fail, but if the call's contents change, we do not fail, as long as
// we display something.
test('home displays metrics', async ({ page }) => {
  expect((await page.getByTestId(METRICS_ITEM).count()) > 0).toBeTruthy()
})

test('home displays latest blocks', async ({ page }) => {
  expect((await page.getByTestId(LATEST_BLOCKS_ITEM).count()) > 0).toBeTruthy()
})

test('home displays top hosts', async ({ page }) => {
  expect((await page.getByTestId(TOP_HOSTS_ITEMS).count()) > 0).toBeTruthy()
})
