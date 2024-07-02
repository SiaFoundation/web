import { test, expect } from '@playwright/test'
import { expectSwitchByLabel, setSwitchByLabel } from '../fixtures/switchValue'
import { setViewMode } from '../fixtures/configViewMode'
import { navigateToConfig } from '../fixtures/navigate'
import {
  expectTextInputByName,
  expectTextInputByNameAttribute,
  fillTextInputByName,
} from '../fixtures/textInput'
import { clearToasts } from '../fixtures/clearToasts'
import { clickIfEnabledAndWait, clickIf } from '../fixtures/click'
import { beforeTest } from '../fixtures/beforeTest'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test('basic field change and save behaviour', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'allowanceDerivedPricing', false)

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
})

test('estimate is based off the allowance', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setSwitchByLabel(page, 'allowanceDerivedPricing', false)
  await setViewMode({ page, state: 'advanced' })

  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'allowanceMonth', '1000')
  await fillTextInputByName(page, 'minShards', '2')
  await fillTextInputByName(page, 'totalShards', '8')

  const estimateParts = [
    'Estimate',
    '100 SC',
    '($10.57)',
    'per TB/month with 4.0x redundancy',
    '1,000 SC',
    '($10.57)',
    'to store 10.00 TB/month with 4.0x redundancy',
  ]

  for (const part of estimateParts) {
    await expect(page.getByText(part)).toBeVisible()
  }
})

test('configure with allowance derived pricing', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setSwitchByLabel(page, 'allowanceDerivedPricing', true)
  await setViewMode({ page, state: 'basic' })

  // Set all values that affect the allowance calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'allowanceMonth', '95,000')

  // The following values are auto updated.
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '3,352.941176')
  await expectTextInputByName(page, 'maxUploadPriceTB', '838.235294')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,191.176471')
  await expectSwitchByLabel(page, 'allowanceDerivedPricing', true)

  // The following values cannot be manually updated.
  await expectTextInputByNameAttribute(
    page,
    'maxStoragePriceTBMonth',
    'readOnly'
  )
  await expectTextInputByNameAttribute(page, 'maxUploadPriceTB', 'readOnly')
  await expectTextInputByNameAttribute(page, 'maxDownloadPriceTB', 'readOnly')
})

test('configure max prices manually', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setSwitchByLabel(page, 'allowanceDerivedPricing', false)
  await setViewMode({ page, state: 'basic' })

  // Set all values that affect the allowance calculation.
  await fillTextInputByName(page, 'storageTB', '10')
  await fillTextInputByName(page, 'uploadTBMonth', '10')
  await fillTextInputByName(page, 'downloadTBMonth', '4')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '1500')
  await fillTextInputByName(page, 'maxUploadPriceTB', '1000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '5000')
  await fillTextInputByName(page, 'allowanceMonth', '777')

  // Changing the allowance does not auto update the max prices.
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '1,500')
  await expectTextInputByName(page, 'maxUploadPriceTB', '1,000')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '5,000')
  await expectSwitchByLabel(page, 'allowanceDerivedPricing', false)
})

test('system offers recommendations', async ({ page }) => {
  // Reset state.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'allowanceDerivedPricing', false)

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
