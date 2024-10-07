import { test, expect } from '@playwright/test'
import { setSwitchByLabel } from '../fixtures/switchValue'
import { setViewMode } from '../fixtures/configViewMode'
import { navigateToConfig } from '../fixtures/navigate'
import { fillTextInputByName } from '../fixtures/textInput'
import { clearToasts } from '../fixtures/clearToasts'
import { clickIfEnabledAndWait, clickIf } from '../fixtures/click'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { configResetAllSettings } from '../fixtures/configResetSettings'

test.beforeEach(async ({ page }) => {
  await beforeTest(page, {
    hostdCount: 6,
  })
  await configResetAllSettings({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('system offers recommendations', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Reset to very high values that will not need any recommendations.
  await fillTextInputByName(page, 'storageTB', '1')
  await fillTextInputByName(page, 'uploadTBMonth', '1')
  await fillTextInputByName(page, 'downloadTBMonth', '1')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '100000000')
  await fillTextInputByName(page, 'maxUploadPriceTB', '100000000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '100000000')
  await clickIfEnabledAndWait(
    page.getByText('Save changes'),
    page.getByText('Configuration has been saved')
  )
  await clearToasts({ page })

  // Configuration matches with hosts.
  await expect(
    page.getByText(
      /(No recommendations to match with more hosts|Configuration matches with a sufficient number of hosts)/
    )
  ).toBeVisible()

  // Reset to low values that will need recommendations.
  await fillTextInputByName(page, 'storageTB', '1')
  await fillTextInputByName(page, 'uploadTBMonth', '1')
  await fillTextInputByName(page, 'downloadTBMonth', '1')
  await fillTextInputByName(page, 'allowanceMonth', '1000')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '300')
  await fillTextInputByName(page, 'maxUploadPriceTB', '75')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '375')
  await clickIfEnabledAndWait(
    page.getByText('Save changes'),
    page.getByText('Configuration has been saved')
  )
  await clearToasts({ page })
  // There are now recommendations.
  await expect(
    page.getByText('No recommendations to match with more hosts')
  ).toBeHidden()

  // Apply all recommendations.
  const count = await page
    .getByTestId('recommendationsList')
    .locator('*')
    .evaluateAll((elements) => elements.length)
  expect(count).toBeGreaterThan(0)

  const storagePriceBtn = page
    .getByTestId('recommendationsList')
    .getByTestId('maxStoragePriceTBMonth')
    .locator('button')
  const uploadPriceBtn = page
    .getByTestId('recommendationsList')
    .getByTestId('maxUploadPriceTB')
    .locator('button')
  const downloadPriceBtn = page
    .getByTestId('recommendationsList')
    .getByTestId('maxDownloadPriceTB')
    .locator('button')

  await clickIf(storagePriceBtn, 'isVisible')
  await expect(storagePriceBtn).toBeHidden()
  await clickIf(uploadPriceBtn, 'isVisible')
  await expect(uploadPriceBtn).toBeHidden()
  await clickIf(downloadPriceBtn, 'isVisible')
  await expect(downloadPriceBtn).toBeHidden()

  // Check that all recommendations were applied and there are changes to the config.
  await expect(page.getByTestId('recommendationsList')).toBeHidden()

  await expect(page.getByText(`Save changes`)).toBeEnabled()
})

test('recommendations work with pinned fields', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Set to low values that will trigger recommendations.
  await fillTextInputByName(page, 'storageTB', '1')
  await fillTextInputByName(page, 'uploadTBMonth', '1')
  await fillTextInputByName(page, 'downloadTBMonth', '1')
  await fillTextInputByName(page, 'allowanceMonth', '1000')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '300')
  await fillTextInputByName(page, 'maxUploadPriceTB', '75')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '375')
  // There are now recommendations.
  await expect(
    page.getByText('No recommendations to match with more hosts')
  ).toBeHidden()

  // Set to high mixed values that will not need any recommendations.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '100000000')
  await fillTextInputByName(page, 'maxUploadPriceTB', '100000000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '100000000')
  await expect(
    page.getByText(
      /(No recommendations to match with more hosts|Configuration matches with a sufficient number of hosts)/
    )
  ).toBeVisible()

  // Set the pinned max storage price to a low USD value equivalent to 100 SC.
  await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '0.39')
  // There are now recommendations again.
  await expect(
    page.getByText('No recommendations to match with more hosts')
  ).toBeHidden()
})
