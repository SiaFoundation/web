import { Page } from '@playwright/test'
import {
  setSwitchByLabel,
  setViewMode,
  fillTextInputByName,
  clearToasts,
  clickIfEnabledAndWait,
  fillSelectInputByName,
  step,
} from '@siafoundation/e2e'
import { navigateToConfig } from './navigate'

export const configResetAllSettings = step(
  'config reset all settings',
  async ({ page }: { page: Page }) => {
    await navigateToConfig({ page })
    await setViewMode({ page, state: 'advanced' })

    // pinning
    await fillSelectInputByName(page, 'pinnedCurrency', 'usd')
    await fillTextInputByName(page, 'pinnedThreshold', '2')

    // storage
    await fillTextInputByName(page, 'storageTB', '1')
    await fillTextInputByName(page, 'uploadTBMonth', '1')
    await fillTextInputByName(page, 'downloadTBMonth', '1')
    await fillTextInputByName(page, 'periodWeeks', '6')
    await fillTextInputByName(page, 'renewWindowWeeks', '2')
    await fillTextInputByName(page, 'amountHosts', '3')
    await setSwitchByLabel(page, 'prune', false)

    // hosts
    await fillTextInputByName(page, 'maxDowntimeHours', '330')
    await fillTextInputByName(page, 'maxConsecutiveScanFailures', '10')
    await fillTextInputByName(page, 'minProtocolVersion', '1.6.0')

    // contracts
    await setSwitchByLabel(page, 'uploadPackingEnabled', true)

    // gouging
    await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
    await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', true)
    await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', true)

    await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '5')
    await fillTextInputByName(page, 'maxUploadPriceTBPinned', '5')
    await fillTextInputByName(page, 'maxDownloadPriceTBPinned', '5')

    await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', false)
    await setSwitchByLabel(page, 'shouldPinMaxDownloadPrice', false)
    await setSwitchByLabel(page, 'shouldPinMaxUploadPrice', false)

    await fillTextInputByName(page, 'maxStoragePriceTBMonth', '3000')
    await fillTextInputByName(page, 'maxUploadPriceTB', '3000')
    await fillTextInputByName(page, 'maxDownloadPriceTB', '3000')
    await fillTextInputByName(page, 'maxRPCPriceMillion', '10')

    await fillTextInputByName(page, 'maxContractPrice', '1')
    await fillTextInputByName(page, 'hostBlockHeightLeeway', '240')
    await fillTextInputByName(page, 'minPriceTableValidityMinutes', '5')
    await fillTextInputByName(page, 'minAccountExpiryDays', '1')
    await fillTextInputByName(page, 'minMaxEphemeralAccountBalance', '1')
    await fillTextInputByName(page, 'migrationSurchargeMultiplier', '1')

    // redundancy
    await fillTextInputByName(page, 'minShards', '1')
    await fillTextInputByName(page, 'totalShards', '3')

    // save
    await clickIfEnabledAndWait(
      page.getByText('Save changes'),
      page.getByText('Configuration has been saved')
    )
    await clearToasts({ page })
    await setViewMode({ page, state: 'basic' })
  }
)

export const configResetBasicSettings = step(
  'config reset basic settings',
  async (page: Page) => {
    await navigateToConfig({ page })
    await setViewMode({ page, state: 'advanced' })

    await fillTextInputByName(page, 'storageTB', '7')
    await fillTextInputByName(page, 'uploadTBMonth', '7')
    await fillTextInputByName(page, 'downloadTBMonth', '7')

    await configFillEstimatesSiacoin(page)

    await fillTextInputByName(page, 'minShards', '1')
    await fillTextInputByName(page, 'totalShards', '3')

    await setViewMode({ page, state: 'basic' })

    // save
    await clickIfEnabledAndWait(
      page.getByText('Save changes'),
      page.getByText('Configuration has been saved')
    )
    await clearToasts({ page })
  }
)

export const configFillEstimatesSiacoin = step(
  'config fill estimates and prices',
  async (page: Page) => {
    await fillTextInputByName(page, 'maxStoragePriceTBMonth', '3000')
    await fillTextInputByName(page, 'maxUploadPriceTB', '3000')
    await fillTextInputByName(page, 'maxDownloadPriceTB', '3000')
  }
)

export const configFillEstimatesFiat = step(
  'config fill estimates fiat',
  async (page: Page) => {
    await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '11.832136')
    await fillTextInputByName(page, 'maxUploadPriceTBPinned', '11.832136')
    await fillTextInputByName(page, 'maxDownloadPriceTBPinned', '11.832136')
  }
)
