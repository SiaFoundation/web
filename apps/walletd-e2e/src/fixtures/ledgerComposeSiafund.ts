import { expect } from '@playwright/test'
import { navigateToWallet } from './navigate'
import { fillComposeTransactionSiafund } from './sendSiafundDialog'
import { step } from '@siafoundation/e2e'

export const ledgerComposeSiafund = step(
  'compose siafund transaction with ledger wallet',
  async (
    page,
    {
      walletName,
      changeAddress,
      receiveAddress,
      claimAddress,
      amount,
      expectedFee,
      expectedVersion,
      transactionVersionIndicator,
    }: {
      walletName: string
      changeAddress: string
      receiveAddress: string
      claimAddress?: string
      amount: number
      expectedFee: number
      expectedVersion: 'v1' | 'v2'
      transactionVersionIndicator: string
    },
  ) => {
    const amountString = `${amount} SF`
    const feeString = `${expectedFee.toFixed(3)} SC`

    await navigateToWallet(page, walletName)
    await page.getByLabel('send').click()
    await fillComposeTransactionSiafund({
      page,
      receiveAddress,
      changeAddress,
      amount,
    })
    const sendDialog = page.getByRole('dialog', { name: 'Send' })
    await expect(sendDialog.getByText('Connect Ledger...')).toBeVisible()
    await expect(
      sendDialog.getByText('Connect device to start signing.'),
    ).toBeVisible()
    await expect(sendDialog.getByLabel('Recipient address')).toContainText(
      receiveAddress.slice(0, 5),
    )
    await expect(sendDialog.getByLabel('Change address')).toContainText(
      changeAddress.slice(0, 5),
    )
    if (expectedVersion === 'v1' && claimAddress) {
      await expect(sendDialog.getByLabel('Claim address')).toContainText(
        claimAddress.slice(0, 5),
      )
    }
    await expect(sendDialog.getByLabel('Amount')).toContainText(amountString)
    await expect(sendDialog.getByLabel('Network fee')).toContainText(feeString)
    await expect(
      sendDialog.getByText(transactionVersionIndicator),
    ).toBeVisible()
    await sendDialog.getByRole('button', { name: 'Close' }).click()
  },
)
