import { expect } from '@playwright/test'
import { navigateToWallet } from './navigate'
import { fillComposeTransactionSiacoin } from './sendSiacoinDialog'
import { step } from '@siafoundation/e2e'

export const ledgerComposeSiacoin = step(
  'compose siacoin transaction with ledger wallet',
  async (
    page,
    {
      walletName,
      changeAddress,
      receiveAddress,
      amount,
      expectedFee,
      transactionVersionIndicator,
    }: {
      walletName: string
      changeAddress: string
      receiveAddress: string
      amount: number
      expectedFee: number
      transactionVersionIndicator: string
    }
  ) => {
    const amountWithFeeString = `${(amount + expectedFee).toFixed(3)} SC`
    await navigateToWallet(page, walletName)
    await page.getByLabel('send').click()
    await fillComposeTransactionSiacoin({
      page,
      receiveAddress,
      changeAddress,
      amount,
    })
    const sendDialog = page.getByRole('dialog', { name: 'Send' })
    await expect(sendDialog.getByText('Connect Ledger...')).toBeVisible()
    await expect(
      sendDialog.getByText('Connect device to start signing.')
    ).toBeVisible()
    await expect(sendDialog.getByLabel('Recipient address')).toContainText(
      receiveAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Change address')).toContainText(
      changeAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Network fee')).toContainText(
      `${expectedFee.toFixed(3)} SC`
    )
    await expect(sendDialog.getByLabel('Total')).toContainText(
      amountWithFeeString
    )
    await expect(
      sendDialog.getByText(transactionVersionIndicator)
    ).toBeVisible()
    await sendDialog.getByRole('button', { name: 'Close' }).click()
  }
)
