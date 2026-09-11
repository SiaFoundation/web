import { test, expect } from '@playwright/test'
import {
  setViewMode,
  expectTextInputVisible,
  expectTextInputNotVisible,
  expectSwitchByLabel,
  fillTextInputByName,
} from '@siafoundation/e2e'
import { navigateToConfig } from '../fixtures/navigate'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import {
  configSetMixedPinning,
  getPinnedSettings,
} from '../fixtures/configSetMixedPinning'

// Pinning is all or nothing, but hosts configured before that was enforced can
// still have only some of their prices pinned. That configuration is preserved
// until the host changes pinning themselves.
test.beforeEach(async ({ page }) => {
  await beforeTest(page)
  await configSetMixedPinning({ page })
})

test.afterEach(async () => {
  await afterTest()
})

test('a mixed pinning configuration is shown as unpinned with a notice', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  // The toggle reads off because pinning is not in effect for every price.
  await expectSwitchByLabel(page, 'shouldPinPrices', false)
  await expect(
    page.getByText('Some of your prices are pinned to fiat values'),
  ).toBeVisible()

  // Each price still shows the value that is actually in effect for it, so the
  // pinned one shows its fiat input and the rest show siacoin.
  await expectTextInputVisible(page, 'storagePricePinned')
  await expectTextInputNotVisible(page, 'storagePrice')
  await expectTextInputVisible(page, 'egressPrice')
  await expectTextInputVisible(page, 'ingressPrice')
  await expectTextInputVisible(page, 'maxCollateral')

  // The pinned price is called out.
  await expect(
    page.getByTestId('storagePriceGroup').getByText('Pinned'),
  ).toBeVisible()
  await expect(
    page.getByTestId('egressPriceGroup').getByText('Pinned'),
  ).toBeHidden()
})

test('a mixed pinning configuration survives an unrelated change', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  // Change something that has nothing to do with pinning and save.
  await fillTextInputByName(page, 'baseRPCPrice', '55')
  await page.getByText('Save changes').click()
  await expect(page.getByText('1 change')).toBeHidden()

  // The host's existing pinning configuration is untouched.
  const settings = await getPinnedSettings()
  expect(settings.storage.pinned).toBe(true)
  expect(settings.egress.pinned).toBe(false)
  expect(settings.ingress.pinned).toBe(false)
  expect(settings.maxCollateral.pinned).toBe(false)

  // And the notice is still shown after the save.
  await expect(
    page.getByText('Some of your prices are pinned to fiat values'),
  ).toBeVisible()
})

test('turning pinning on resolves a mixed configuration to all pinned', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  await page.getByRole('button', { name: 'Pin all', exact: true }).click()

  // Resolving the mixed configuration takes the notice away and counts as a
  // change on its own, so the host can save the choice immediately.
  await expect(
    page.getByText('Some of your prices are pinned to fiat values'),
  ).toBeHidden()
  await expect(page.getByText('Save changes')).toBeEnabled()

  // Every price now needs a fiat value.
  await fillTextInputByName(page, 'egressPricePinned', '2')
  await fillTextInputByName(page, 'ingressPricePinned', '1')
  await fillTextInputByName(page, 'maxCollateralPinned', '100')
  await page.getByText('Save changes').click()

  await expect(async () => {
    const settings = await getPinnedSettings()
    expect(settings.storage.pinned).toBe(true)
    expect(settings.egress.pinned).toBe(true)
    expect(settings.ingress.pinned).toBe(true)
    expect(settings.maxCollateral.pinned).toBe(true)
  }).toPass()
})

test('turning pinning off resolves a mixed configuration to none pinned', async ({
  page,
}) => {
  await navigateToConfig({ page })
  await setViewMode({ page, state: 'advanced' })

  // Unpinning is a single click even though the switch already reads off.
  await page.getByRole('button', { name: 'Unpin all' }).click()

  await expect(
    page.getByText('Some of your prices are pinned to fiat values'),
  ).toBeHidden()
  // The choice is a change on its own, so no other edit is needed to save it.
  await expect(page.getByText('Save changes')).toBeEnabled()
  await page.getByText('Save changes').click()

  await expect(async () => {
    const settings = await getPinnedSettings()
    expect(settings.storage.pinned).toBe(false)
    expect(settings.egress.pinned).toBe(false)
    expect(settings.ingress.pinned).toBe(false)
    expect(settings.maxCollateral.pinned).toBe(false)
  }).toPass()
})
