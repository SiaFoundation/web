import { Page } from '@playwright/test'
import {
  setSwitchByLabel,
  setViewMode,
  clickIfEnabledAndWait,
  clearToasts,
  fillTextInputByName,
  fillSelectInputByName,
  step,
} from '@siafoundation/e2e'
import { navigateToConfig } from './navigate'

export const configResetAllSettings = step(
  'config reset all settings',
  async ({ page }: { page: Page }) => {
    await navigateToConfig({ page })
    await setViewMode({ page, state: 'advanced' })

    // host
    await setSwitchByLabel(page, 'acceptingContracts', false)
    await fillTextInputByName(page, 'netAddress', 'foobar.com')
    await fillTextInputByName(page, 'maxContractDuration', '6')

    // pricing
    await fillSelectInputByName(page, 'pinnedCurrency', 'USD')
    await fillTextInputByName(page, 'pinnedThreshold', '3')

    await setSwitchByLabel(page, 'shouldPinStoragePrice', false)
    await fillTextInputByName(page, 'storagePrice', '10')
    await setSwitchByLabel(page, 'shouldPinStoragePrice', true)
    await fillTextInputByName(page, 'storagePricePinned', '5')
    await setSwitchByLabel(page, 'shouldPinStoragePrice', false)

    await setSwitchByLabel(page, 'shouldPinEgressPrice', false)
    await fillTextInputByName(page, 'egressPrice', '10')
    await setSwitchByLabel(page, 'shouldPinEgressPrice', true)
    await fillTextInputByName(page, 'egressPricePinned', '5')
    await setSwitchByLabel(page, 'shouldPinEgressPrice', false)

    await setSwitchByLabel(page, 'shouldPinIngressPrice', false)
    await fillTextInputByName(page, 'ingressPrice', '10')
    await setSwitchByLabel(page, 'shouldPinIngressPrice', true)
    await fillTextInputByName(page, 'ingressPricePinned', '5')
    await setSwitchByLabel(page, 'shouldPinIngressPrice', false)

    await fillTextInputByName(page, 'collateralMultiplier', '2')

    await setSwitchByLabel(page, 'shouldPinMaxCollateral', false)
    await fillTextInputByName(page, 'maxCollateral', '10')
    await setSwitchByLabel(page, 'shouldPinMaxCollateral', true)
    await fillTextInputByName(page, 'maxCollateralPinned', '5')
    await setSwitchByLabel(page, 'shouldPinMaxCollateral', false)

    await fillTextInputByName(page, 'contractPrice', '0.2')
    await fillTextInputByName(page, 'baseRPCPrice', '1')
    await fillTextInputByName(page, 'sectorAccessPrice', '1')
    await fillTextInputByName(page, 'priceTableValidity', '30')

    // accounts
    await fillTextInputByName(page, 'accountExpiry', '30')
    await fillTextInputByName(page, 'maxAccountBalance', '10')

    // bandwidth
    await fillTextInputByName(page, 'ingressLimit', '0')
    await fillTextInputByName(page, 'egressLimit', '0')

    // DNS
    await fillSelectInputByName(page, 'dnsProvider', '')

    // save
    await clickIfEnabledAndWait(
      page.getByText('Save changes'),
      page.getByText('Settings have been saved')
    )
    await clearToasts({ page })
    await setViewMode({ page, state: 'basic' })
    await navigateToConfig({ page })
  }
)
