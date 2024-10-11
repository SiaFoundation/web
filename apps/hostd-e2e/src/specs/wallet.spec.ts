import { test, expect } from '@playwright/test'
import { navigateToWallet } from '../fixtures/navigate'
import { random } from '@technically/lodash'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { fillTextInputByName, setSwitchByLabel } from '@siafoundation/e2e'
import BigNumber from 'bignumber.js'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('send siacoin with include fee off', async ({ page }) => {
  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const amount = String(random(1, 5))
  const amountString = `${amount}.000 SC`
  const amountWithFeeString = `${amount}.012 SC`

  await navigateToWallet(page)

  // Setup.
  await page.getByLabel('send').click()
  const sendDialog = page.getByRole('dialog', { name: 'Send siacoin' })
  await fillTextInputByName(page, 'address', receiveAddress)
  await fillTextInputByName(page, 'siacoin', amount)
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountWithFeeString)
  ).toBeVisible()

  // Confirm.
  await page.getByRole('button', { name: 'Generate transaction' }).click()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5))
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountString)
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountWithFeeString)
  ).toBeVisible()

  // Complete.
  await page.getByRole('button', { name: 'Broadcast transaction' }).click()
  await expect(
    page.getByText('Transaction successfully broadcasted.')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5))
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountString)
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountWithFeeString)
  ).toBeVisible()
  await expect(sendDialog.getByTestId('transactionId')).toBeVisible()

  // List.
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByTestId('eventsTable')).toBeVisible()
  await expect(
    page.getByTestId('eventsTable').locator('tbody tr').first()
  ).toBeVisible()
  await expect(
    page
      .getByTestId('eventsTable')
      .locator('tbody tr')
      .first()
      .getByTestId('amount')
      .getByText(`-${amountWithFeeString}`)
  ).toBeVisible()
})

test('send siacoin with include fee on', async ({ page }) => {
  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const amount = new BigNumber(random(1, 5))
  const amountString = `${amount.toFixed(3)} SC`
  const amountWithoutFeeString = `${amount.minus(0.012).toFixed(3)} SC`

  await navigateToWallet(page)

  // Setup.
  await page.getByLabel('send').click()
  const sendDialog = page.getByRole('dialog', { name: 'Send siacoin' })
  await fillTextInputByName(page, 'address', receiveAddress)
  await fillTextInputByName(page, 'siacoin', amount.toString())
  await setSwitchByLabel(page, 'includeFee', true)
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString)
  ).toBeVisible()

  // Confirm.
  await page.getByRole('button', { name: 'Generate transaction' }).click()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5))
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountWithoutFeeString)
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString)
  ).toBeVisible()

  // Complete.
  await page.getByRole('button', { name: 'Broadcast transaction' }).click()
  await expect(
    page.getByText('Transaction successfully broadcasted.')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5))
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountWithoutFeeString)
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC')
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString)
  ).toBeVisible()
  await expect(sendDialog.getByTestId('transactionId')).toBeVisible()

  // List.
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByTestId('eventsTable')).toBeVisible()
  await expect(
    page.getByTestId('eventsTable').locator('tbody tr').first()
  ).toBeVisible()
  await expect(
    page
      .getByTestId('eventsTable')
      .locator('tbody tr')
      .first()
      .getByTestId('amount')
      .getByText(`-${amountString}`)
  ).toBeVisible()
})
