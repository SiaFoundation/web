import { expect } from '@playwright/test'
import { unlockOpenWallet } from './wallet'
import { navigateToWallet } from './navigate'
import { fillComposeTransactionSiacoin } from './sendSiacoinDialog'
import { step, testRequiresClipboardPermissions } from '@siafoundation/e2e'

export const sendSiacoinWithSeedWallet = step(
  'send siacoin with a seed wallet',
  async (
    page,
    {
      browserName,
      walletName,
      mnemonic,
      changeAddress,
      receiveAddress,
      amount,
      fee,
    }: {
      browserName: string
      walletName: string
      mnemonic: string
      changeAddress: string
      receiveAddress: string
      amount: number
      fee: number
    }
  ) => {
    testRequiresClipboardPermissions(browserName)
    const amountWithFeeString = `${(amount + fee).toFixed(3)} SC`

    await navigateToWallet(page, walletName)
    await unlockOpenWallet(page, mnemonic)
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
  }
)
