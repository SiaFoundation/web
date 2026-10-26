import { test, expect } from '@playwright/test'
import { random } from '@technically/lodash'
import { fillTextInputByName } from '@siafoundation/e2e'
import { afterTest, beforeTest } from '../fixtures/beforeTest'
import { navigateToWallet } from '../fixtures/navigate'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('wallet lists the mining payouts that funded it', async ({ page }) => {
  await navigateToWallet(page)
  const events = page.getByTestId('eventsTable')
  await expect(events).toBeVisible()
  await expect(
    events.locator('tbody tr').first().getByText('miner payout'),
  ).toBeVisible()
})

test('send siacoin', async ({ page }) => {
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
    sendDialog.getByTestId('total').getByText(amountWithFeeString),
  ).toBeVisible()

  // Confirm.
  await page.getByRole('button', { name: 'Generate transaction' }).click()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5)),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountString),
  ).toBeVisible()

  // Complete.
  await page.getByRole('button', { name: 'Broadcast transaction' }).click()
  await expect(
    page.getByText('Transaction successfully broadcasted.'),
  ).toBeVisible()
  await expect(sendDialog.getByTestId('transactionId')).toBeVisible()

  // List.
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(
    page
      .getByTestId('eventsTable')
      .locator('tbody tr')
      .first()
      .getByTestId('amount')
      .getByText(`-${amountWithFeeString}`),
  ).toBeVisible()
})
