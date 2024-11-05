import { test, expect } from '@playwright/test'
import { navigateToConfig } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { configResetAllSettings } from '../fixtures/configResetSettings'
import {
  fillSelectInputByName,
  clickTwice,
  setSwitchByLabel,
  setViewMode,
  expectTextInputByName,
  fillTextInputByName,
  setCurrencyDisplay,
} from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  await configResetAllSettings({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('field change and save behaviours', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Test that values can be updated.
  await fillTextInputByName(page, 'storageTB', '7')
  await fillTextInputByName(page, 'uploadTBMonth', '7')
  await fillTextInputByName(page, 'downloadTBMonth', '7')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '7000')
  await fillTextInputByName(page, 'maxUploadPriceTB', '7000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '7000')

  // Correct number of changes is shown.
  await expect(page.getByText('6 changes')).toBeVisible()
  await page.getByText('Save changes').click()
  await expect(page.getByText('6 changes')).toBeHidden()

  // Values are the same after save.
  await expectTextInputByName(page, 'storageTB', '7')
  await expectTextInputByName(page, 'uploadTBMonth', '7')
  await expectTextInputByName(page, 'downloadTBMonth', '7')
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '7,000')
  await expectTextInputByName(page, 'maxUploadPriceTB', '7,000')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '7,000')

  await expect(
    page
      .getByTestId('spendingEstimate')
      .locator('input[name=estimatedSpendingPerMonth]')
  ).toHaveValue('228,667')
  await expect(
    page
      .getByTestId('spendingEstimate')
      .locator('input[name=estimatedSpendingPerMonth-fiat]')
  ).toHaveValue('$902')

  await fillSelectInputByName(page, 'spendingEstimateMode', 'tb')

  await expect(
    page
      .getByTestId('spendingEstimate')
      .locator('input[name=estimatedSpendingPerTBPerMonth]')
  ).toHaveValue('32,667')
  await expect(
    page
      .getByTestId('spendingEstimate')
      .locator('input[name=estimatedSpendingPerTBPerMonth-fiat]')
  ).toHaveValue('$129')
})

test('set max prices to fit current spending estimate', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')

  // If a component of the fit calculation is missing, it should not be shown.
  await fillTextInputByName(page, 'storageTB', '')
  await expect(spendingEstimate).toBeHidden()

  // Set all values that affect the pricing calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')

  await rebalanceButton.click()

  // The following values are fit to the estimated spending.
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '4,517.647059')
  await expectTextInputByName(page, 'maxUploadPriceTB', '1,129.411765')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '5,647.058824')

  // If the prices fit the estimate the button should be disabled.
  await expect(rebalanceButton).toBeDisabled()
})

test('should show warning if pinning is not fully configured', async ({
  page,
}) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)
  await fillSelectInputByName(page, 'pinnedCurrency', '')

  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByText('Select a pinned currency')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxUploadPriceTBGroup')
      .getByText('Select a pinned currency')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxDownloadPriceTBGroup')
      .getByText('Select a pinned currency')
  ).toBeVisible()
})

test('set max prices with pinned fields to fit current spending estimate', async ({
  page,
}) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)

  // Set all values that affect the pricing calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')

  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')

  await expect(rebalanceButton).toBeEnabled()
  await rebalanceButton.click()
  await expect(rebalanceButton).toBeDisabled()

  // The following values are fit to the spending estimate.
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$7.53')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$1.88')
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$9.41')

  // Unpin one field while leaving the other two pinned.
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', false)
  await expect(rebalanceButton).toBeEnabled()
  await rebalanceButton.click()
  await expect(rebalanceButton).toBeDisabled()

  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$7.76')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$1.94')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '2,458.147059')
})

test('pinned currency and app display currency can be different', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$5')
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
      .getByText('¥248.17')
  ).toBeVisible()
  const averageButton = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('¥248.17')
  // TODO: remove the need to click twice, there is some sort of glitch after toggling the pinning switch.
  await clickTwice(averageButton)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
})
