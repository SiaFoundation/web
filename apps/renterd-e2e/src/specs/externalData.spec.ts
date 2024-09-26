import { test, expect } from '@playwright/test'
import { setSwitchByLabel } from '../fixtures/switchValue'
import { setViewMode } from '../fixtures/configViewMode'
import { navigateToConfig } from '../fixtures/navigate'
import { afterTest } from '../fixtures/beforeTest'
import { mockApiSiaScanExchangeRatesHanging } from '../fixtures/siascan'
import { clusterd, setupCluster } from '@siafoundation/clusterd'
import { login } from '../fixtures/login'
import { fillSelectInputByName } from '../fixtures/selectInput'
import {
  mockApiSiaCentralHostsNetworkAverages,
  mockApiSiaCentralHostsNetworkAveragesHanging,
} from '@siafoundation/sia-central-mock'

test.beforeEach(async () => {
  await setupCluster({ renterdCount: 1 })
})

test.afterEach(async () => {
  await afterTest()
})

test('configuration shows not-enabled message when exchange rates API hangs', async ({
  page,
}) => {
  await mockApiSiaScanExchangeRatesHanging({ page })
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  await login({
    page,
    address: renterdNode.apiAddress,
    password: renterdNode.password,
  })
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)

  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')

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
  await mockApiSiaCentralHostsNetworkAveragesHanging({ page })
  const renterdNode = clusterd.nodes.find((n) => n.type === 'renterd')
  await login({
    page,
    address: renterdNode.apiAddress,
    password: renterdNode.password,
  })
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'basic' })
  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')

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

  await page.unroute('https://api.siascan.com/exchange-rate/siacoin/*')
  await mockApiSiaCentralHostsNetworkAverages({ page })
  await page.reload()

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
