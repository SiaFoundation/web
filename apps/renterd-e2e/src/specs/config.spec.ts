import { test, expect } from '@playwright/test'
import { setSwitchByLabel } from '../fixtures/switchValue'
import { setViewMode } from '../fixtures/configViewMode'
import { navigateToConfig } from '../fixtures/navigate'
import {
  expectTextInputByName,
  fillTextInputByName,
} from '../fixtures/textInput'
import { clearToasts } from '../fixtures/clearToasts'
import { clickIfEnabledAndWait, clickIf } from '../fixtures/click'
import { beforeTest } from '../fixtures/beforeTest'
import { setCurrencyDisplay } from '../fixtures/preferences'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test('basic field change and save behaviour', async ({ page }) => {
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
    '($10.57)',
    'per TB/month with 3.0x redundancy',
    '7,000 SC',
    '($74.00)',
    'to store 7.00 TB/month with 3.0x redundancy',
  ]

  for (const part of estimateParts) {
    await expect(page.getByText(part)).toBeVisible()
  }

  // Tips are displayed in the correct currency.
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
      .getByText('357')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Fit current allowance')
      .getByText('300')
  ).toBeVisible()
  await setCurrencyDisplay(page, 'bothPreferFiat')
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
      .getByText('$3.77')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Fit current allowance')
      .getByText('$3.17')
  ).toBeVisible()
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

  // The following allownce is fit to the max prices.
  await expectTextInputByName(page, 'allowanceMonth', '21,000')
})

test('should show warning if pinning is not fully configured', async ({
  page,
}) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillTextInputByName(page, 'forexEndpointURL', '')

  await expect(
    page
      .getByTestId('allowanceMonthGroup')
      .getByText('Enter a forex endpoint URL')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByText('Enter a forex endpoint URL')
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
  await page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .click()
  // TODO: remove the need to click twice, there is some sort of glitch after toggling the pinning switch.
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

  await expect(
    page.getByText(
      /(0 recommendations to match with more hosts|Configuration matches with a sufficient number of hosts)/
    )
  ).toBeVisible()

  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonth', '21000')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '100')
  await fillTextInputByName(page, 'maxUploadPriceTB', '100')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '100')
  await clickIfEnabledAndWait(
    page.getByText('Save changes'),
    page.getByText('Configuration has been saved')
  )
  await clearToasts({ page })
  // There are now recommendations.
  await expect(
    page.getByText('0 recommendations to match with more hosts')
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
  // TODO: disabled because sometimes the "increase value" recommendation is
  // replaced with a "decrease value" recommendation with the same value.
  // await expect(page.getByTestId('recommendationsList')).toBeHidden()

  await expect(page.getByText(`Save changes`)).toBeEnabled()
})

test('recommendations work with pinned fields', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })

  // Set to low values that will trigger recommendations.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonth', '21000')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '100')
  await fillTextInputByName(page, 'maxUploadPriceTB', '100')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '100')
  // There are now recommendations.
  await expect(
    page.getByText('0 recommendations to match with more hosts')
  ).toBeHidden()

  // Set to high mixed values that will not need any recommendations.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '100000000')
  await fillTextInputByName(page, 'maxUploadPriceTB', '100000000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '100000000')
  await expect(
    page.getByText(
      /(0 recommendations to match with more hosts|Configuration matches with a sufficient number of hosts)/
    )
  ).toBeVisible()

  // Set the pinned max storage price to a low USD value equivalent to 100 SC.
  await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '0.39')
  // There are now recommendations again.
  await expect(
    page.getByText('0 recommendations to match with more hosts')
  ).toBeHidden()
})
