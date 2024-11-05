import { test, expect } from '@playwright/test'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  clickTwice,
  setSwitchByLabel,
  expectTextInputByName,
  setCurrencyDisplay,
  setViewMode,
} from '@siafoundation/e2e'
import {
  configResetBasicSettings,
  configFillEstimatesFiat,
  configFillEstimatesSiacoin,
} from '../fixtures/configResetSettings'

test.beforeEach(async ({ page }) => {
  test.setTimeout(150_000)
  await beforeTest(page)
  await configResetBasicSettings(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('field tips for storage', async ({ page }) => {
  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')

  // Storage siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let storageNetworkAverage = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('341')
  await expect(storageNetworkAverage).toBeVisible()
  await clickTwice(storageNetworkAverage)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '2,604.6')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let storageNetworkAverageFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('$1.34')
  await expect(storageNetworkAverageFiat).toBeVisible()
  await clickTwice(storageNetworkAverageFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '2,604.6')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let storageNetworkAverageFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('¥248.17')
  await expect(storageNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(storageNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '2,604.6')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)

  // Storage fiat.
  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  storageNetworkAverage = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('341')
  await expect(storageNetworkAverage).toBeVisible()
  await clickTwice(storageNetworkAverage)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$10.27')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  storageNetworkAverageFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('$1.34')
  await expect(storageNetworkAverageFiat).toBeVisible()
  await clickTwice(storageNetworkAverageFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$10.27')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  storageNetworkAverageFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('¥248.17')
  await expect(storageNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(storageNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$10.27')
})

test('field tips for upload', async ({ page }) => {
  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')

  // Upload siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let uploadNetworkAverage = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('76')
  await expect(uploadNetworkAverage).toBeVisible()
  await clickTwice(uploadNetworkAverage)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTB', '611.4')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let uploadNetworkAverageFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$0.30')
  await expect(uploadNetworkAverageFiat).toBeVisible()
  await clickTwice(uploadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTB', '611.4')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let uploadNetworkAverageFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥55.31')
  await expect(uploadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(uploadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTB', '611.4')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)

  // Upload fiat.
  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  uploadNetworkAverage = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('76')
  await expect(uploadNetworkAverage).toBeVisible()
  await clickTwice(uploadNetworkAverage)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$2.41')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  uploadNetworkAverageFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$0.30')
  await expect(uploadNetworkAverageFiat).toBeVisible()
  await clickTwice(uploadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$2.41')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  uploadNetworkAverageFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥55.31')
  await expect(uploadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(uploadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$2.41')
})

test('field tips for download', async ({ page }) => {
  const spendingEstimate = page.getByTestId('spendingEstimate')
  const rebalanceButton = spendingEstimate.getByLabel('rebalance prices')

  // Download siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let downloadNetworkAverage = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('899')
  await expect(downloadNetworkAverage).toBeVisible()
  await clickTwice(downloadNetworkAverage)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,724.732143')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let downloadNetworkAverageFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$3.55')
  await expect(downloadNetworkAverageFiat).toBeVisible()
  await clickTwice(downloadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,724.732143')

  await configFillEstimatesSiacoin(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let downloadNetworkAverageFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥654.27')
  await expect(downloadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(downloadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTB', '4,724.732143')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)

  // Download fiat.
  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  downloadNetworkAverage = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('899')
  await expect(downloadNetworkAverage).toBeVisible()
  await clickTwice(downloadNetworkAverage)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$18.63')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  downloadNetworkAverageFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$3.55')
  await expect(downloadNetworkAverageFiat).toBeVisible()
  await clickTwice(downloadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$18.63')

  await configFillEstimatesFiat(page)
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  downloadNetworkAverageFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥654.27')
  await expect(downloadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(downloadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  await rebalanceButton.click()
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$18.63')
})

test('field tips max contract and rpc prices', async ({ page }) => {
  await setViewMode({ page, state: 'advanced' })

  // Contract.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  const contractSuggestion = page
    .getByTestId('maxContractPrice')
    .getByLabel('suggestion')
    .getByText('1')
  await expect(contractSuggestion).toBeVisible()
  await clickTwice(contractSuggestion)
  await expectTextInputByName(page, 'maxContractPrice', '1')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  const contractSuggestionFiat = page
    .getByTestId('maxContractPrice')
    .getByLabel('suggestion')
    .getByText('$0.00')
  await expect(contractSuggestionFiat).toBeVisible()
  await clickTwice(contractSuggestionFiat)
  await expectTextInputByName(page, 'maxContractPrice', '1')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  const contractSuggestionFiatJPY = page
    .getByTestId('maxContractPrice')
    .getByLabel('suggestion')
    .getByText('¥0.73')
  await expect(contractSuggestionFiatJPY).toBeVisible()
  await clickTwice(contractSuggestionFiatJPY)
  await expectTextInputByName(page, 'maxContractPrice', '1')

  // RPC.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  const rpcSuggestion = page
    .getByTestId('maxRPCPriceMillion')
    .getByLabel('suggestion')
    .getByText('10')
  await expect(rpcSuggestion).toBeVisible()
  await clickTwice(rpcSuggestion)
  await expectTextInputByName(page, 'maxRPCPriceMillion', '10')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  const rpcSuggestionFiat = page
    .getByTestId('maxRPCPriceMillion')
    .getByLabel('suggestion')
    .getByText('$0.04')
  await expect(rpcSuggestionFiat).toBeVisible()
  await clickTwice(rpcSuggestionFiat)
  await expectTextInputByName(page, 'maxRPCPriceMillion', '10')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  const rpcSuggestionFiatJPY = page
    .getByTestId('maxRPCPriceMillion')
    .getByLabel('suggestion')
    .getByText('¥7.28')
  await expect(rpcSuggestionFiatJPY).toBeVisible()
  await clickTwice(rpcSuggestionFiatJPY)
  await expectTextInputByName(page, 'maxRPCPriceMillion', '10')
})
