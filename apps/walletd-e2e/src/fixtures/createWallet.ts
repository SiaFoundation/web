import { expect, Page } from '@playwright/test'
import { mockApiWallet } from '../mocks/mock'
import {
  Wallet,
  WalletAddressesResponse,
  WalletBalanceResponse,
  WalletFundResponse,
  WalletOutputsSiacoinResponse,
} from '@siafoundation/react-walletd'
import { mockApiWallets } from '../mocks/wallets'

export async function createWallet({
  page,
  seed,
  newWallet,
  responses = {},
}: {
  page: Page
  seed: string
  newWallet: Wallet
  responses?: {
    balance?: WalletBalanceResponse
    outputsSiacoin?: WalletOutputsSiacoinResponse
    fund?: WalletFundResponse
    addresses?: WalletAddressesResponse
  }
}) {
  const wallets = await mockApiWallets({ page, createWallet: newWallet })
  await mockApiWallet({
    page,
    wallet: newWallet,
    responses,
  })

  await expect(page.getByRole('button', { name: 'Add wallet' })).toBeVisible()
  await page.getByRole('button', { name: 'Add wallet' }).click()
  await page.getByRole('button', { name: 'Create a wallet Generate a' }).click()
  await page.locator('input[name=name]').fill(newWallet.name)
  await page.locator('input[name=name]').press('Tab')
  await page.locator('textarea[name=description]').fill(newWallet.name)
  await page.locator('textarea[name=description]').press('Tab')
  await page.locator('textarea[name=mnemonic]').click()
  wallets.push(newWallet)
  await page.getByRole('button', { name: 'Add wallet' }).click()
  await expect(
    page.getByText(`Wallet ${newWallet.name.slice(0, 5)}`)
  ).toBeVisible()
  await page.locator('input[name=mnemonic]').fill(seed)
  await page.getByRole('button', { name: 'Continue' }).click()
}
