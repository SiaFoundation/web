import { test, expect } from '@playwright/test'
import { recoverWallet, rescanWallets, walletInList } from '../fixtures/wallet'
import { navigateToWallet } from '../fixtures/navigateToWallet'
import { fillComposeTransactionSiacoin } from '../fixtures/sendSiacoinDialog'
import { random } from '@technically/lodash'
import {
  afterTest,
  beforeTest,
  sendSiacoinFromRenterd,
} from '../fixtures/beforeTest'
import { toHastings } from '@siafoundation/units'
import { testRequiresClipboardPermissions } from '../fixtures/skip'

test.beforeEach(async ({ page }) => {
  await beforeTest(page)
})

test.afterEach(async () => {
  await afterTest()
})

test('send siacoin with a seed wallet', async ({ page, browserName }) => {
  testRequiresClipboardPermissions(browserName)
  // Mnemonic and address0 for the wallet.
  const name = 'test-send-siacoin-seed-wallet'
  const mnemonic =
    'myth north belt curtain short disease neck jungle jealous venue across very'
  const address0 =
    '3af8e2a77c4b666dfc3cf7f68dfabaf61fa9d7707cbcd4308a5b75b63a9452e3edc505af3c79'
  // Add some funds to address 0 to use for sending.
  await sendSiacoinFromRenterd(address0, toHastings(1_000_000).toString())

  // Recipient address for the transaction.
  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const changeAddress = address0
  const amount = String(random(1, 20))
  const amountWithFeeString = `${amount}.004 SC`

  await recoverWallet(page, name, mnemonic)
  await walletInList(page, name)
  await rescanWallets(page)
  await navigateToWallet(page, name)
  await page.getByLabel('send').click()
  await fillComposeTransactionSiacoin({
    page,
    receiveAddress,
    changeAddress,
    amount,
  })
  const sendDialog = page.getByRole('dialog', { name: 'Send' })
  await expect(
    sendDialog.getByText('The wallet is currently unlocked')
  ).toBeVisible()
  await expect(sendDialog.getByText('Total')).toBeVisible()
  await expect(sendDialog.getByText(amountWithFeeString)).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(
    page.getByText('Transaction successfully broadcast')
  ).toBeVisible()
  await expect(sendDialog.getByText(receiveAddress.slice(0, 5))).toBeVisible()
  await expect(sendDialog.getByText(changeAddress.slice(0, 5))).toBeVisible()
  await expect(sendDialog.getByText('Total')).toBeVisible()
  await expect(sendDialog.getByText(amountWithFeeString)).toBeVisible()
  await sendDialog.getByRole('button', { name: 'Close' }).click()

  await page.reload()
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
