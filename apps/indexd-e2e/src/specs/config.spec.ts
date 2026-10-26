import { test, expect } from '@playwright/test'
import {
  expectSwitchByLabel,
  expectTextInputByName,
  fillSelectInputByName,
  fillTextInputByName,
  setSwitchByLabel,
} from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToConfig } from '../fixtures/navigate'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('save contract and pricing settings', async ({ page }) => {
  await navigateToConfig(page)
  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')
  await fillTextInputByName(page, 'wantedContracts', '20')
  await fillTextInputByName(page, 'periodWeeks', '6')
  await fillTextInputByName(page, 'renewWindowWeeks', '2')
  await fillTextInputByName(page, 'maxStoragePriceTBMonth', '500')
  await fillTextInputByName(page, 'maxIngressPriceTB', '7')
  await fillTextInputByName(page, 'maxEgressPriceTB', '9')
  await fillTextInputByName(page, 'minCollateral', '11')
  await fillTextInputByName(page, 'minProtocolVersion', '1.2.3')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByText('Configuration has been saved')).toBeVisible()

  // The settings persist across a reload.
  await page.reload()
  await expectTextInputByName(page, 'wantedContracts', '20')
  await expectTextInputByName(page, 'periodWeeks', '6')
  await expectTextInputByName(page, 'renewWindowWeeks', '2')
  await expectTextInputByName(page, 'maxStoragePriceTBMonth', '500')
  await expectTextInputByName(page, 'maxIngressPriceTB', '7')
  await expectTextInputByName(page, 'maxEgressPriceTB', '9')
  await expectTextInputByName(page, 'minCollateral', '11')
  await expectTextInputByName(page, 'minProtocolVersion', '1.2.3')
})

test('show the fiat value of siacoin prices', async ({ page }) => {
  await navigateToConfig(page)
  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')
  await fillTextInputByName(page, 'maxIngressPriceTB', '7')
  // 7 SC at the mocked rate of 0.01 USD per SC.
  await expectTextInputByName(page, 'maxIngressPriceTB-fiat', '$0.07')
})

test('pin a price to a fiat currency', async ({ page }) => {
  await navigateToConfig(page)
  await fillSelectInputByName(page, 'pinnedCurrency', 'usd')
  await setSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await fillTextInputByName(page, 'maxStoragePriceTBMonthPinned', '3')
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByText('Configuration has been saved')).toBeVisible()

  // The pin persists across a reload.
  await page.reload()
  await expectSwitchByLabel(page, 'shouldPinMaxStoragePrice', true)
  await expectTextInputByName(page, 'maxStoragePriceTBMonthPinned', '$3')
})

test('reject an invalid protocol version', async ({ page }) => {
  await navigateToConfig(page)
  await fillTextInputByName(page, 'minProtocolVersion', 'abc')
  await expect(page.getByText('invalid version')).toBeVisible()
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(
    page.getByText('Min protocol version: invalid version'),
  ).toBeVisible()

  // Nothing was saved.
  await page.reload()
  await expectTextInputByName(page, 'minProtocolVersion', '0.0.0')
})
