import { test, expect } from '@playwright/test'
import {
  setViewMode,
  expectTextInputByName,
  expectTextInputVisible,
  expectTextInputNotVisible,
  fillTextInputByName,
  fillSelectInputByName,
  expectSwitchByLabel,
  expectSwitchVisible,
  setSwitchByLabel,
} from '@siafoundation/e2e'
import { navigateToConfig } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { configResetAllSettings } from '../fixtures/configResetAllSettings'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  await configResetAllSettings({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('basic field change and save behaviour', async ({ page }) => {
  // Reset state.
  await setViewMode({ page, state: 'advanced' })

  // Test that values can be updated.
  await setSwitchByLabel(page, 'acceptingContracts', true)
  await fillTextInputByName(page, 'netAddress', 'foobar1.com')
  await fillTextInputByName(page, 'maxContractDuration', '7')
  await fillSelectInputByName(page, 'pinnedCurrency', 'BTC')
  await fillTextInputByName(page, 'pinnedThreshold', '7')
  await setSwitchByLabel(page, 'shouldPinPrices', true)
  await fillTextInputByName(page, 'storagePricePinned', '77')
  await fillTextInputByName(page, 'egressPricePinned', '77')
  await fillTextInputByName(page, 'baseRPCPrice', '77')

  // Correct number of changes is shown.
  await expect(page.getByText('9 changes')).toBeVisible()
  await page.getByText('Save changes').click()
  await expect(page.getByText('9 changes')).toBeHidden()

  // Values are the same after save.
  await expectSwitchByLabel(page, 'acceptingContracts', true)
  // Address change detected.
  // await expect(
  //   page.getByText('Address has changed, make sure to re-announce the host.')
  // ).toBeVisible()
  await expectTextInputByName(page, 'netAddress', 'foobar1.com')
  await expectTextInputByName(page, 'maxContractDuration', '7')
  await fillSelectInputByName(page, 'pinnedCurrency', 'USD')
  await expectTextInputByName(page, 'pinnedThreshold', '7')
  // Pinning applies to every price at once, so all of the pinned fields are
  // shown and none of the siacoin fields are.
  await expectSwitchByLabel(page, 'shouldPinPrices', true)
  await expectTextInputByName(page, 'storagePricePinned', '$77')
  await expectTextInputNotVisible(page, 'storagePrice')
  await expectTextInputByName(page, 'egressPricePinned', '$77')
  await expectTextInputNotVisible(page, 'egressPrice')
  await expectTextInputNotVisible(page, 'ingressPrice')
  await expectTextInputNotVisible(page, 'maxCollateral')
  await expectTextInputByName(page, 'baseRPCPrice', '77')
})

test('pinning applies to all prices at once', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  // With pinning off every price is configured in siacoin.
  await setSwitchByLabel(page, 'shouldPinPrices', false)
  await expectTextInputVisible(page, 'storagePrice')
  await expectTextInputVisible(page, 'egressPrice')
  await expectTextInputVisible(page, 'ingressPrice')
  await expectTextInputVisible(page, 'maxCollateral')
  await expectTextInputNotVisible(page, 'storagePricePinned')

  // Turning pinning on switches all of them to fiat.
  await setSwitchByLabel(page, 'shouldPinPrices', true)
  await expectTextInputVisible(page, 'storagePricePinned')
  await expectTextInputVisible(page, 'egressPricePinned')
  await expectTextInputVisible(page, 'ingressPricePinned')
  await expectTextInputVisible(page, 'maxCollateralPinned')
  await expectTextInputNotVisible(page, 'storagePrice')
})

test('pin switch should show in both view modes', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await expectSwitchVisible(page, 'shouldPinPrices')

  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })
  await expectSwitchVisible(page, 'shouldPinPrices')
})

test('pinned max collateral should show in both view modes', async ({
  page,
}) => {
  // Max collateral must be configurable wherever pinning is, otherwise it can
  // be pinned without the host being able to see or set its value.
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'shouldPinPrices', true)
  await expectTextInputVisible(page, 'maxCollateralPinned')

  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })
  await expectTextInputVisible(page, 'maxCollateralPinned')
})

test('dynamic max collateral suggestion', async ({ page }) => {
  await navigateToConfig({ page })
  await fillTextInputByName(page, 'maxCollateral', '777')
  await expect(
    page
      .getByTestId('maxCollateralGroup')
      .getByLabel('Suggestion')
      .getByText('600 SC'),
  ).toBeVisible()

  // Set all values that affect the max collateral calculation.
  await fillTextInputByName(page, 'storagePrice', '10')
  await fillTextInputByName(page, 'collateralMultiplier', '10')
  await expect(
    page
      .getByTestId('maxCollateralGroup')
      .getByLabel('Suggestion')
      .getByText('3,000 SC'),
  ).toBeVisible()
})
