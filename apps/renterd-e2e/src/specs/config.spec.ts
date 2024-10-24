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
  await fillTextInputByName(page, 'allowanceMonth', '7000')

  // Correct number of changes is shown.
  await expect(page.getByText('7 changes')).toBeVisible()
  await page.getByText('Save changes').click()
  await expect(page.getByText('7 changes')).toBeHidden()

  // Values are the same after save.
  await expectTextInputByName(page, 'storageTB', '7')
  await expectTextInputByName(page, 'uploadTBMonth', '7')
  await expectTextInputByName(page, 'downloadTBMonth', '7')
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '7,000')
  await expectTextInputByName(page, 'maxUploadPriceTB', '7,000')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '7,000')
  await expectTextInputByName(page, 'allowanceMonth', '7,000')

  // Estimate is based off the allowance.
  const estimateParts = [
    'Estimate',
    '1,000 SC',
    '($3.94)',
    'per TB/month with 3.0x redundancy',
    '7,000 SC',
    '($27.61)',
    'to store 7.00 TB/month with 3.0x redundancy',
  ]

  for (const part of estimateParts) {
    await expect(page.getByText(part)).toBeVisible()
  }
})

test('set max prices to fit current allowance', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Set all values that affect the pricing calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonth', '95,000')
  await page.getByText('Set max prices to fit current allowance').click()

  // The following values are fit to the allowance.
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '3,352.941176')
  await expectTextInputByName(page, 'maxUploadPriceTB', '838.235294')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,191.176471')

  // If a component of the fit calculation is missing, it should not be shown.
  await fillTextInputByName(page, 'storageTB', '')
  await expect(
    page.getByText('Set max prices to fit current allowance')
  ).toBeDisabled()
})

test('set allowance to fit current max prices', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Set all values that affect the allowance calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '1500')
  await fillTextInputByName(page, 'maxUploadPriceTB', '1000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '5000')
  await page.getByText('Set allowance to fit current max prices').click()

  // The following allowance is fit to the max prices.
  await expectTextInputByName(page, 'allowanceMonth', '63,333')

  // If a component of the fit calculation is missing, it should not be shown.
  await fillTextInputByName(page, 'storageTB', '')
  await expect(
    page.getByText('Set allowance to fit current max prices')
  ).toBeDisabled()
})

test('should show warning if pinning is not fully configured', async ({
  page,
}) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillSelectInputByName(page, 'pinnedCurrency', '')

  await expect(
    page
      .getByTestId('allowanceMonthGroup')
      .getByText('Select a pinned currency')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByText('Select a pinned currency')
  ).toBeVisible()
})

test('set max prices with pinned fields to fit current allowance', async ({
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
  await fillTextInputByName(page, 'allowanceMonth', '95,000')
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  await page.getByText('Set max prices to fit current allowance').click()
  await expect(page.getByText('Current pricing fits allowance')).toBeVisible()

  // The following values are fit to the allowance.
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$13.22')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$3.31')
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$16.53')

  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', false)
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  await page.getByText('Set max prices to fit current allowance').click()
  await expect(page.getByText('Current pricing fits allowance')).toBeVisible()

  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$13.22')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$3.31')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,191.176471')
})

test('set max prices with pinned fields to fit pinned allowance', async ({
  page,
}) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)

  // Set all values that affect the pricing calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonthPinned', '100')
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  await page.getByText('Set max prices to fit current allowance').click()
  await expect(page.getByText('Current pricing fits allowance')).toBeVisible()

  // The following values are fit to the allowance.
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$3.53')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.88')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '1,118.588756')
})

test('set max prices via individual field tips', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)

  // Set all values that affect the pricing calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonthPinned', '100')
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  const fitButton = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
  // TODO: remove the need to click twice, there is some sort of glitch after toggling the pinning switch.
  await clickTwice(fitButton)
  await page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .click()
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  await page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .click()
  await expect(
    page.getByText('Current pricing may not fit allowance')
  ).toBeVisible()
  await page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .click()
  await expect(page.getByText('Current pricing fits allowance')).toBeVisible()

  // The following values are fit to the allowance.
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$3.53')
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.88')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '1,118.588756')
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
