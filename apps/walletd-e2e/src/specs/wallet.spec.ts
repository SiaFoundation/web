import { expect, test } from '@playwright/test'
import { login } from '../fixtures/login'
import { navigateToWallet } from '../fixtures/navigateToWallet'
import {
  createNewWallet,
  deleteWalletIfExists,
  recoverWallet,
  walletInList,
} from '../fixtures/wallet'

test('create new seed wallet', async ({ page, context }) => {
  const name = 'my-new-seed-wallet'
  await login({ page })
  await deleteWalletIfExists(page, name)
  await createNewWallet(page, context, name)
  await expect(page.getByRole('table').getByText(name).first()).toBeVisible()
  await page.getByRole('table').getByText(name).first().click()
  await expect(page.getByText('The wallet has no')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Addresses' })).toBeVisible()
})

test('recover wallet and see existing transactions', async ({
  page,
  context,
}) => {
  const name = 'my-existing-wallet'
  await login({ page })
  await deleteWalletIfExists(page, name)
  const mnemonic =
    'kite best great glance better spy core rigid angle mind man net'
  await recoverWallet(page, context, name, mnemonic)
  await walletInList(page, name)
  await navigateToWallet(page, name)
  const row1 = page.getByRole('row', { name: '9e8d82a3e590' })
  await expect(row1.getByText('6/12/24')).toBeVisible()
  await expect(row1.getByText('transaction')).toBeVisible()
  await expect(row1.getByText('+110.000 SC')).toBeVisible()
  const row2 = page.getByRole('row', { name: '4bbbfcce2f1f' })
  await expect(row2.getByText('transaction')).toBeVisible()
  await expect(row2.getByText('6/11/24')).toBeVisible()
  await expect(row2.getByText('+300.000 SC')).toBeVisible()
})
