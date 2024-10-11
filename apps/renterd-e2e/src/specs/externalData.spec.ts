import { test, expect } from '@playwright/test'
import { afterTest } from '../fixtures/beforeTest'
import { clusterd, setupCluster } from '@siafoundation/clusterd'
import { login } from '../fixtures/login'
import {
  mockApiSiaCentralHostsNetworkAverages,
  mockApiSiaCentralHostsNetworkAveragesHanging,
  mockApiSiaCentralHostsNetworkAveragesUnroute,
} from '@siafoundation/sia-central-mock'
import { configResetBasicSettings } from '../fixtures/configResetSettings'
import {
  expectTextInputByName,
  setSwitchByLabel,
  mockApiSiaScanExchangeRates,
  mockApiSiaScanExchangeRatesUnroute,
  mockApiSiaScanExchangeRatesHanging,
  fillSelectInputByName,
} from '@siafoundation/e2e'

test.beforeEach(async ({ page }) => {
  await mockApiSiaScanExchangeRates({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await setupCluster({ renterdCount: 1 })
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  await login({
    page,
    address: renterdNode.apiAddress,
    password: renterdNode.password,
  })
  await configResetBasicSettings({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('configuration shows fiat values on siacoin fields', async ({ page }) => {
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '3,000')
  await expectTextInputByName(page, 'maxUploadPriceTB', '3,000')
  await expectTextInputByName(page, 'maxDownloadPriceTB', '3,000')

  await expectTextInputByName(page, 'maxStoragePriceTBMonth-fiat', '$11.832136')
  await expectTextInputByName(page, 'maxUploadPriceTB-fiat', '$11.832136')
  await expectTextInputByName(page, 'maxDownloadPriceTB-fiat', '$11.832136')
})

test('configuration shows not-enabled message when exchange rates API hangs', async ({
  page,
}) => {
  await mockApiSiaScanExchangeRatesUnroute({ page })
  await mockApiSiaScanExchangeRatesHanging({ page })
  await page.reload()

  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)

  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')

  // Regular field should be shown.
  await expectTextInputByName(page, 'storageTB', '7')
  await expectTextInputByName(page, 'uploadTBMonth', '7')
  await expectTextInputByName(page, 'downloadTBMonth', '7')

  // Pinned fields show not-enabled message.
  await expect(
    page
      .getByTestId('allowanceMonthGroup')
      .getByText('Enable an exchange rate API')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByText('Enable an exchange rate API')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxUploadPriceTBGroup')
      .getByText('Enable an exchange rate API')
  ).toBeVisible()
})

test('configuration does not show network averages when sia central API hangs', async ({
  page,
}) => {
  await mockApiSiaCentralHostsNetworkAveragesUnroute({ page })
  await mockApiSiaCentralHostsNetworkAveragesHanging({ page })
  await page.reload()

  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')

  // Regular field should still be shown.
  await expectTextInputByName(page, 'storageTB', '7')
  await expectTextInputByName(page, 'uploadTBMonth', '7')
  await expectTextInputByName(page, 'downloadTBMonth', '7')

  // Network averages should NOT be shown.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', false)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', false)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', false)
  await expect(
    page.getByTestId('maxStoragePriceTBMonthGroup').getByText('Network average')
  ).toBeHidden()
  await expect(
    page.getByTestId('maxUploadPriceTBGroup').getByText('Network average')
  ).toBeHidden()
  await expect(
    page.getByTestId('maxDownloadPriceTBGroup').getByText('Network average')
  ).toBeHidden()
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)
  await expect(
    page.getByTestId('maxStoragePriceTBMonthGroup').getByText('Network average')
  ).toBeHidden()
  await expect(
    page.getByTestId('maxUploadPriceTBGroup').getByText('Network average')
  ).toBeHidden()
  await expect(
    page.getByTestId('maxDownloadPriceTBGroup').getByText('Network average')
  ).toBeHidden()

  await mockApiSiaCentralHostsNetworkAveragesUnroute({ page })
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await page.reload()

  // Regular field should be shown.
  await expectTextInputByName(page, 'storageTB', '7')
  await expectTextInputByName(page, 'uploadTBMonth', '7')
  await expectTextInputByName(page, 'downloadTBMonth', '7')

  // Network averages should be shown, and not be 0.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', false)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', false)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', false)
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page.getByTestId('maxUploadPriceTBGroup').getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page.getByTestId('maxDownloadPriceTBGroup').getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
  await expect(
    page
      .getByTestId('maxUploadPriceTBGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
  await expect(
    page
      .getByTestId('maxDownloadPriceTBGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page.getByTestId('maxUploadPriceTBGroup').getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page.getByTestId('maxDownloadPriceTBGroup').getByLabel('Network average')
  ).toBeVisible()
  await expect(
    page
      .getByTestId('maxStoragePriceTBMonthGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
  await expect(
    page
      .getByTestId('maxUploadPriceTBGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
  await expect(
    page
      .getByTestId('maxDownloadPriceTBGroup')
      .getByLabel('Network average')
      .getByText('0 SC')
  ).toBeHidden()
})
