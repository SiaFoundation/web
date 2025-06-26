import { test, expect } from '@playwright/test'
import { ExplorerApp } from '../fixtures/ExplorerApp'
import {
  foundationHostKey,
  TROUBLESHOOTER_FORM_SUBMIT,
  TROUBLESHOOTER_RESULTS,
} from '../fixtures/constants'

let explorerApp: ExplorerApp

test.beforeEach(async ({ page }) => {
  explorerApp = new ExplorerApp(page)
})

test('can search a host', async ({ page }) => {
  // This pattern exists because the troubleshooter API is rate limited. We can't
  // do multiple tests that hit this route in quick succession with the same key.
  const requestPromise = page.waitForRequest(
    `**/troubleshoot/${foundationHostKey}*`,
  )
  await page.goto('/troubleshoot')

  await page
    .getByRole('textbox', { name: 'ed25519:707d18...' })
    .fill(foundationHostKey)
  await page.getByTestId(TROUBLESHOOTER_FORM_SUBMIT).click()

  const request = await requestPromise

  expect(request.url()).toContain(`/troubleshoot/${foundationHostKey}`)
})

test('can directly navigate to a host', async ({ page }) => {
  await explorerApp.goTo('/troubleshoot/' + foundationHostKey)

  await expect(page.getByTestId(TROUBLESHOOTER_RESULTS)).toBeVisible()
})
