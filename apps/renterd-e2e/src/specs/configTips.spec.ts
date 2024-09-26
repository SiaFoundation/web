import { test, expect } from '@playwright/test'
import { setSwitchByLabel } from '../fixtures/switchValue'
import { setViewMode } from '../fixtures/configViewMode'
import { navigateToConfig } from '../fixtures/navigate'
import {
  expectTextInputByName,
  fillTextInputByName,
} from '../fixtures/textInput'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { setCurrencyDisplay } from '../fixtures/preferences'
import { clickTwice } from '../fixtures/click'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('field tips for storage', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  await fillTextInputByName(page, 'allowanceMonth', '7000')
  await fillTextInputByName(page, 'storageTB', '7')
  await fillTextInputByName(page, 'uploadTBMonth', '7')
  await fillTextInputByName(page, 'downloadTBMonth', '7')
  await fillTextInputByName(page, 'minShards', '1')
  await fillTextInputByName(page, 'totalShards', '3')

  // Storage siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let storageNetworkAverage = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('341')
  await expect(storageNetworkAverage).toBeVisible()
  await clickTwice(storageNetworkAverage)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  let storageFitCurrentAllowance = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('300')
  await expect(storageFitCurrentAllowance).toBeVisible()
  await clickTwice(storageFitCurrentAllowance)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '300')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let storageNetworkAverageFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('$1.34')
  await expect(storageNetworkAverageFiat).toBeVisible()
  await clickTwice(storageNetworkAverageFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  let storageFitCurrentAllowanceFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('$1.18')
  await expect(storageFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(storageFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '300')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let storageNetworkAverageFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('¥248.17')
  await expect(storageNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(storageNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '341')
  let storageFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥218.33')
  await expect(storageFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(storageFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '300')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillTextInputByName(page, 'allowanceMonthPinned', '30')

  // Storage fiat.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  storageNetworkAverage = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('341')
  await expect(storageNetworkAverage).toBeVisible()
  await clickTwice(storageNetworkAverage)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  storageFitCurrentAllowance = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('326')
  await expect(storageFitCurrentAllowance).toBeVisible()
  await clickTwice(storageFitCurrentAllowance)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.29')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  storageNetworkAverageFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('$1.34')
  await expect(storageNetworkAverageFiat).toBeVisible()
  await clickTwice(storageNetworkAverageFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  storageFitCurrentAllowanceFiat = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('$1.29')
  await expect(storageFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(storageFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.29')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  storageNetworkAverageFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Network average')
    .getByText('¥248.17')
  await expect(storageNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(storageNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.34')
  storageFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxStoragePriceTBMonthGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥237.25')
  await expect(storageFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(storageFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$1.29')
})

test('field tips for upload', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  await fillTextInputByName(page, 'allowanceMonth', '7000')
  await fillTextInputByName(page, 'storageTB', '7')
  await fillTextInputByName(page, 'uploadTBMonth', '7')
  await fillTextInputByName(page, 'downloadTBMonth', '7')
  await fillTextInputByName(page, 'minShards', '1')
  await fillTextInputByName(page, 'totalShards', '3')

  // Upload siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let uploadNetworkAverage = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('76')
  await expect(uploadNetworkAverage).toBeVisible()
  await clickTwice(uploadNetworkAverage)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  let uploadFitCurrentAllowance = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('75')
  await expect(uploadFitCurrentAllowance).toBeVisible()
  await clickTwice(uploadFitCurrentAllowance)
  await expectTextInputByName(page, 'maxUploadPriceTB', '75')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let uploadNetworkAverageFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$0.30')
  await expect(uploadNetworkAverageFiat).toBeVisible()
  await clickTwice(uploadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  let uploadFitCurrentAllowanceFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('$0.30')
  await expect(uploadFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(uploadFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxUploadPriceTB', '75')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let uploadNetworkAverageFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥55.31')
  await expect(uploadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(uploadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTB', '76')
  let uploadFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥54.58')
  await expect(uploadFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(uploadFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTB', '75')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)
  await fillTextInputByName(page, 'allowanceMonthPinned', '30')

  // Upload fiat.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  uploadNetworkAverage = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('76')
  await expect(uploadNetworkAverage).toBeVisible()
  await clickTwice(uploadNetworkAverage)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  uploadFitCurrentAllowance = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('81')
  await expect(uploadFitCurrentAllowance).toBeVisible()
  await clickTwice(uploadFitCurrentAllowance)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.32')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  uploadNetworkAverageFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$0.30')
  await expect(uploadNetworkAverageFiat).toBeVisible()
  await clickTwice(uploadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  uploadFitCurrentAllowanceFiat = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('$0.32')
  await expect(uploadFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(uploadFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.32')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  uploadNetworkAverageFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥55.31')
  await expect(uploadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(uploadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.30')
  uploadFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxUploadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥59.31')
  await expect(uploadFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(uploadFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxUploadPriceTBPinned', '$0.32')
})

test('field tips for download', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  await fillTextInputByName(page, 'allowanceMonth', '7000')
  await fillTextInputByName(page, 'storageTB', '7')
  await fillTextInputByName(page, 'uploadTBMonth', '7')
  await fillTextInputByName(page, 'downloadTBMonth', '7')
  await fillTextInputByName(page, 'minShards', '1')
  await fillTextInputByName(page, 'totalShards', '3')

  // Download siacoin.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  let downloadNetworkAverage = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('899')
  await expect(downloadNetworkAverage).toBeVisible()
  await clickTwice(downloadNetworkAverage)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  let downloadFitCurrentAllowance = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('375')
  await expect(downloadFitCurrentAllowance).toBeVisible()
  await clickTwice(downloadFitCurrentAllowance)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '375')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  let downloadNetworkAverageFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$3.55')
  await expect(downloadNetworkAverageFiat).toBeVisible()
  await clickTwice(downloadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  let downloadFitCurrentAllowanceFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('$1.48')
  await expect(downloadFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(downloadFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '375')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  let downloadNetworkAverageFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥654.27')
  await expect(downloadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(downloadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '899')
  let downloadFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥272.92')
  await expect(downloadFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(downloadFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTB', '375')

  // Fiat.
  await setSwitchByLabel(page, 'shouldPinAllowance', true)
  await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)
  await fillTextInputByName(page, 'allowanceMonthPinned', '30')

  // Download fiat.
  await setCurrencyDisplay(page, 'bothPreferSc', 'usd')
  downloadNetworkAverage = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('899')
  await expect(downloadNetworkAverage).toBeVisible()
  await clickTwice(downloadNetworkAverage)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  downloadFitCurrentAllowance = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('407')
  await expect(downloadFitCurrentAllowance).toBeVisible()
  await clickTwice(downloadFitCurrentAllowance)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$1.61')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'usd')
  downloadNetworkAverageFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('$3.55')
  await expect(downloadNetworkAverageFiat).toBeVisible()
  await clickTwice(downloadNetworkAverageFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  downloadFitCurrentAllowanceFiat = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('$1.61')
  await expect(downloadFitCurrentAllowanceFiat).toBeVisible()
  await clickTwice(downloadFitCurrentAllowanceFiat)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$1.61')
  await setCurrencyDisplay(page, 'bothPreferFiat', 'jpy')
  downloadNetworkAverageFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Network average')
    .getByText('¥654.27')
  await expect(downloadNetworkAverageFiatJPY).toBeVisible()
  await clickTwice(downloadNetworkAverageFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$3.55')
  downloadFitCurrentAllowanceFiatJPY = page
    .getByTestId('maxDownloadPriceTBGroup')
    .getByLabel('Fit current allowance')
    .getByText('¥296.56')
  await expect(downloadFitCurrentAllowanceFiatJPY).toBeVisible()
  await clickTwice(downloadFitCurrentAllowanceFiatJPY)
  await expectTextInputByName(page, 'maxDownloadPriceTBPinned', '$1.61')
})

test('field tips max contract and rpc prices', async ({ page }) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  await fillTextInputByName(page, 'allowanceMonth', '7000')
  await fillTextInputByName(page, 'storageTB', '7')
  await fillTextInputByName(page, 'uploadTBMonth', '7')
  await fillTextInputByName(page, 'downloadTBMonth', '7')
  await fillTextInputByName(page, 'minShards', '1')
  await fillTextInputByName(page, 'totalShards', '3')

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
