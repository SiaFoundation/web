import { expect, test } from '@playwright/test'
import { random } from '@technically/lodash'
import { login } from '../fixtures/login'
import { navigateToWallet } from '../fixtures/navigateToWallet'
import { fillComposeTransactionSiacoin } from '../fixtures/sendSiacoinDialog'
import { unlockWallet, walletInList } from '../fixtures/wallet'

test('send siacoin with a seed wallet', async ({ page }) => {
  const name = 'test-send-siacoin-seed-wallet'
  const receiveAddress =
    '5739945c21e60afd70eaf97ccd33ea27836e0219212449f39e4b38acaa8b3119aa4150a9ef0f'
  const changeAddress =
    '2a95add7cfc95b5c484a787c15b912e491876ca2f39982b62495049520acf798bf2e2cf6c326'
  const mnemonic =
    'march wait photo expire sweet hurry photo joy sail certain time beef'
  const amount = String(random(1, 20))
  const amountWithFeeString = `${amount}.004 SC`

  await login({ page })
  await walletInList(page, name)
  await unlockWallet(page, name, mnemonic)
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
    sendDialog.getByText('The wallet is currently unlocked'),
  ).toBeVisible()
  await expect(sendDialog.getByText('Total')).toBeVisible()
  await expect(sendDialog.getByText(amountWithFeeString)).toBeVisible()

  await page
    .getByRole('button', { name: 'Sign and broadcast transaction' })
    .click()
  await expect(
    page.getByText('Transaction successfully broadcast'),
  ).toBeVisible()
  await expect(sendDialog.getByText(receiveAddress.slice(0, 5))).toBeVisible()
  await expect(sendDialog.getByText(changeAddress.slice(0, 5))).toBeVisible()
  await expect(sendDialog.getByText('Total')).toBeVisible()
  await expect(sendDialog.getByText(amountWithFeeString)).toBeVisible()
  await sendDialog.getByRole('button', { name: 'Close' }).click()
  await expect(page.getByTestId('eventsTable')).toBeVisible()
  await expect(
    page.getByTestId('eventsTable').locator('tbody tr').first(),
  ).toBeVisible()
  await expect(
    page
      .getByTestId('eventsTable')
      .locator('tbody tr')
      .first()
      .getByTestId('amount')
      .getByText(`-${amountWithFeeString}`),
  ).toBeVisible()
})
