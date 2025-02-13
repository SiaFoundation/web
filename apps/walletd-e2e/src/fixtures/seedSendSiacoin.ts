import { expect } from '@playwright/test'
import { unlockOpenWallet } from './wallet'
import { navigateToWallet } from './navigate'
import { fillComposeTransactionSiacoin } from './sendSiacoinDialog'
import { step } from '@siafoundation/e2e'

export const sendSiacoinWithSeedWallet = step(
  'send siacoin with a seed wallet',
  async (
    page,
    {
      walletName,
      mnemonic,
      changeAddress,
      receiveAddress,
      amount,
      expectedFee,
      expectedVersion,
    }: {
      walletName: string
      mnemonic: string
      changeAddress: string
      receiveAddress: string
      amount: number
      expectedFee: number
      expectedVersion: 'v1' | 'v2'
    }
  ) => {
    const amountWithFeeString = `${(amount + expectedFee).toFixed(3)} SC`
    const feeString = `${expectedFee.toFixed(3)} SC`
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
    await expect(sendDialog.getByLabel('Recipient address')).toContainText(
      receiveAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Change address')).toContainText(
      changeAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Network fee')).toContainText(feeString)
    await expect(sendDialog.getByText('Total')).toBeVisible()
    await expect(sendDialog.getByText(amountWithFeeString)).toBeVisible()

    await page
      .getByRole('button', { name: 'Sign and broadcast transaction' })
      .click()
    await expect(
      page.getByText('Transaction successfully broadcast')
    ).toBeVisible()
    await expect(sendDialog.getByLabel('Recipient address')).toContainText(
      receiveAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Change address')).toContainText(
      changeAddress.slice(0, 5)
    )
    await expect(sendDialog.getByLabel('Network fee')).toContainText(feeString)
    await expect(sendDialog.getByLabel('Total')).toContainText(
      amountWithFeeString
    )
    if (expectedVersion === 'v2') {
      await expect(sendDialog.getByLabel('Transaction ID')).toBeVisible()
    }
    await sendDialog.getByRole('button', { name: 'Close' }).click()
    if (expectedVersion === 'v2') {
      await expect(sendDialog.getByLabel('Transaction ID')).toBeVisible()
    }
    const transactionId: string | undefined =
      expectedVersion === 'v2'
        ? ((await sendDialog
            .getByLabel('Transaction ID')
            .getAttribute('value')) as string)
        : undefined

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

    return transactionId
  }
)
