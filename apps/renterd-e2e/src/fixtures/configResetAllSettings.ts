import { Page } from '@playwright/test'
import { setSwitchByLabel } from './switchValue'
import { setViewMode } from './configViewMode'
import { fillTextInputByName } from './textInput'
import { clearToasts } from './clearToasts'
import { clickIfEnabledAndWait } from './click'

export async function configResetAllSettings({ page }: { page: Page }) {
  await setViewMode({ page, state: 'advanced' })
  await setSwitchByLabel(page, 'autoAllowance', false)

  // storage
  await fillTextInputByName(page, 'storageTB', '1')
  await fillTextInputByName(page, 'uploadTBMonth', '1')
  await fillTextInputByName(page, 'downloadTBMonth', '1')
  await fillTextInputByName(page, 'allowanceMonth', '21000')
  await fillTextInputByName(page, 'periodWeeks', '6')
  await fillTextInputByName(page, 'renewWindowWeeks', '2')
  await fillTextInputByName(page, 'amountHosts', '12')
  await fillTextInputByName(page, 'autopilotContractSet', 'autopilot')
  await setSwitchByLabel(page, 'prune', false)

  // hosts
  await setSwitchByLabel(page, 'allowRedundantIPs', false)
  await fillTextInputByName(page, 'maxDowntimeHours', '7')
  await fillTextInputByName(page, 'minRecentScanFailures', '1')
  await fillTextInputByName(page, 'minProtocolVersion', '1.6.0')

  // contracts
  await fillTextInputByName(page, 'defaultContractSet', 'autopilot')
  await setSwitchByLabel(page, 'uploadPackingEnabled', true)

  // gouging
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '3000')
  await fillTextInputByName(page, 'maxUploadPriceTB', '3000')
  await fillTextInputByName(page, 'maxDownloadPriceTB', '3000')
  await fillTextInputByName(page, 'maxContractPrice', '1')
  await fillTextInputByName(page, 'maxRpcPriceMillion', '10')
  await fillTextInputByName(page, 'hostBlockHeightLeeway', '12')
  await fillTextInputByName(page, 'minPriceTableValidityMinutes', '5')
  await fillTextInputByName(page, 'minAccountExpiryDays', '1')
  await fillTextInputByName(page, 'minMaxEphemeralAccountBalance', '1')
  await fillTextInputByName(page, 'migrationSurchargeMultiplier', '1')

  // redundancy
  await fillTextInputByName(page, 'minShards', '2')
  await fillTextInputByName(page, 'totalShards', '6')

  // save
  await clickIfEnabledAndWait(
    page.getByText('Save changes'),
    page.getByText('Configuration has been saved')
  )
  await clearToasts({ page })
}
