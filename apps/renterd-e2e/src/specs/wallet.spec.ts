import { test, expect } from '@playwright/test'
import { navigateToWallet } from '../fixtures/navigate'
import { random } from '@technically/lodash'
import { beforeTest } from '../fixtures/beforeTest'
import BigNumber from 'bignumber.js'
import {
  setSwitchByLabel,
  fillTextInputByName,
  valueFromCopyToClipboardButton,
} from '@siafoundation/e2e'
import {
  Cluster,
  mine,
  waitUntilRenterdWalletBalanceIsSpendable,
} from '@siafoundation/clusterd'

let cluster: Cluster

test.beforeEach(async ({ page }) => {
  cluster = await beforeTest(page)
  // For some reason the balance never becomes spendable unless we first mine
  // a block. It does not matter what maturity delay we use.
  await mine(1)
  await waitUntilRenterdWalletBalanceIsSpendable(
    cluster.daemons.renterds[0].api,
  )
  await page.reload()
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
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
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
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountWithFeeString),
  ).toBeVisible()

  // Complete.
  await page.getByRole('button', { name: 'Broadcast transaction' }).click()
  await expect(
    page.getByText('Transaction successfully broadcasted.'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5)),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountString),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountWithFeeString),
  ).toBeVisible()
  await expect(sendDialog.getByTestId('transactionId')).toBeVisible()
  const transactionId = await valueFromCopyToClipboardButton(
    page,
    sendDialog.getByTestId('transactionId').locator('button').first(),
  )

  // List.
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByTestId('eventsTable')).toBeVisible()
  const transactionRow = page.getByTestId(transactionId)
  await expect(transactionRow).toBeVisible()
  await expect(
    transactionRow.getByTestId('amount').getByText(`-${amountWithFeeString}`),
  ).toBeVisible()
  await expect(
    transactionRow.getByTestId('type').getByText('siacoin transfer'),
  ).toBeVisible()
  await expect(
    transactionRow.getByTestId('fee').getByText('12.000 mS'),
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
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString),
  ).toBeVisible()

  // Confirm.
  await page.getByRole('button', { name: 'Generate transaction' }).click()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5)),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountWithoutFeeString),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString),
  ).toBeVisible()

  // Complete.
  await page.getByRole('button', { name: 'Broadcast transaction' }).click()
  await expect(
    page.getByText('Transaction successfully broadcasted.'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('address').getByText(receiveAddress.slice(0, 5)),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('amount').getByText(amountWithoutFeeString),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('networkFee').getByText('0.012 SC'),
  ).toBeVisible()
  await expect(
    sendDialog.getByTestId('total').getByText(amountString),
  ).toBeVisible()
  await expect(sendDialog.getByTestId('transactionId')).toBeVisible()
  const transactionId = await valueFromCopyToClipboardButton(
    page,
    sendDialog.getByTestId('transactionId').locator('button').first(),
  )

  // List.
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByTestId('eventsTable')).toBeVisible()
  const transactionRow = page.getByTestId(transactionId)
  await expect(transactionRow).toBeVisible()
  await expect(
    transactionRow.getByTestId('amount').getByText(`-${amountString}`),
  ).toBeVisible()
  await expect(
    transactionRow.getByTestId('type').getByText('siacoin transfer'),
  ).toBeVisible()
  await expect(
    transactionRow.getByTestId('fee').getByText('12.000 mS'),
  ).toBeVisible()
})
